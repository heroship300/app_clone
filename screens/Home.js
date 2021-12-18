import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import HeaderTabs from '../components/HeaderTabs';
import Categories from '../components/Categories';
import RestaurantItems, { localRestaurants, } from '../components/RestaurantItems'
import SearchBar from '../components/SearchBar';



// const GOOGLE_API_KEY = "AIzaSyBhiSYCw5fVJ2hXzsOYHTC3dAVLyAtxOII"
const YELP_API_KEY =
  "X7krp05z7i2XjCsCQar1AxLf3EHZYHZ9k7JY4palu-gt1Ww2agAGzU8hkOHpZc2mJy6xOXfT6iKSoc24nLQoIfS_EqBnuSbBEPx571ZNkMoeVLXkNZG8NiuqWK66YXYx";


export default function Home() {
    const [restaurantData, setRestaurantData] = useState(localRestaurants);
    const [city, setCity] = useState ("Gallerie Food Court");
    const [activeTab, setActiveTab] = useState("Delivery")

    const getRestaurantsFromYelp = () => {
        const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;
    
        const apiOptions = {
          headers: {
            Authorization: `Bearer ${YELP_API_KEY}`,
          },
        };

        return fetch(yelpUrl, apiOptions)
        .then((res) => res.json())
        .then((json) => 
          setRestaurantData(
          json.businesses.filter((businesses) => 
            businesses.transactions.includes(activeTab.toLowerCase())))
        );
    };

    useEffect(() => {
        getRestaurantsFromYelp();
      }, [city, activeTab]);

    

    


  return (
    <SafeAreaView style={{ backgroundColor: "#eee", flex: 1}}>
        <View style={{backgroundColor: "white", padding: 15}}>
            <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
            <SearchBar cityHandler={setCity} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
            <Categories />
            <RestaurantItems 
            restaurantData={restaurantData}
            
             />
        </ScrollView>
    </SafeAreaView>
  );
}

