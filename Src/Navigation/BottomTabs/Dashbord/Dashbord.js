import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {formatDistanceToNow} from 'date-fns';
import COLORS from '../../../Assets/consts/colors';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

import {hideNavigationBar} from 'react-native-navigation-bar-color';
const Dashboard = () => {
  useEffect(() => {
    
    hideNavigationBar();
  }, []);
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); 

  const [loadingMore, setLoadingMore] = useState(false);
  
  const token = useSelector(state => state.token);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      if (!token) {
        console.error('Token not available');
        return;
      }

      if (loadingMore) {
        return; 
      }

      setLoadingMore(true);

      const response = await axios.get(
        `http://182.176.169.225:19008/api/v1/blogs/?page=${page}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status !== 200) {
        console.error('Error:', response.status, response.statusText);
        return;
      }

      const result = response.data;

      setData(prevData => [...prevData, ...result.data.result]);

      setPage(prevPage => prevPage + 1); 
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.updatedTime}>
          {formatDistanceToNow(new Date(item.updatedAt), {addSuffix: true})}
        </Text>
        <Text style={styles.itemDescription} numberOfLines={3}>
          {item.description}
        </Text>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <Image style={styles.itemImage} source={{uri: item.image}} />
        </View>
      </View>
    </View>
  );

  const handleEndReached = () => {
    
    if (!loading && !loadingMore && data.length > 0) {
      fetchData(); 
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{flex: 0.15}}></View>
        <TouchableOpacity
          style={{
            margin: 10,
            alignItems: 'flex-start',
            alignContent: 'flex-start',
          }}>
          <Image
            style={{height: 32, width: 32}}
            source={require('../../../Assets/Icons/menu.png')}
          />
        </TouchableOpacity>
        <Text style={styles.headerText} numberOfLines={2}>
          Hi, what do you want to read
        </Text>
      </View>
      <View style={{flex: 0.03}}></View>
      {/* FlatList view */}
      <View style={styles.flatListView}>
        {loading && page === 1 ? ( 
          <ActivityIndicator
          style={styles.loadingMoreIndicator}
          size='large'
          color={COLORS.primary}
        />
        ) : (
          <FlatList
            style={styles.flatList}
            data={data}
            keyExtractor={item => item._id.toString()}
            renderItem={renderItem}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.1} 
            ListFooterComponent={() =>
              loadingMore ? (
                <ActivityIndicator
                  style={styles.loadingMoreIndicator}
                  size="small"
                  color={COLORS.primary}
                />
              ) : null
            }
          />
        )}
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flex: 0.2,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginHorizontal: '5%',
    width: '90%',
  },
  headerText: {
    fontSize: 32,
    fontFamily: 'Space Grotesk',
    fontWeight: '700',
    color: '#090D20',
  },
  flatListView: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flex: 0.8,
  },
  flatList: {
    // Add any additional styling for the FlatList
  },
  itemContainer: {
    borderRadius: 20,
    padding: 10,
    width: '90%',
    marginHorizontal: '5%',
    backgroundColor: 'rgba(243, 244, 249, 1)',
    borderBottomColor: COLORS.lightGray,
    marginVertical: 20,
    height: 300,
    justifyContent: 'space-evenly',
  },
  itemImage: {
    flex: 0.95,
    borderRadius: 20,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#090D20',
  },
  itemDescription: {
    marginVertical: 10,
    fontSize: 14,
    fontWeight: '700',
    color: ' rgba(26, 27, 31, 0.72)',
  },
});
