import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Cons } from './Cons';
import { searchData, fetchData, clearData } from '../redux/actions/dataAction';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const CusHeader = ({ endPoint }) => {

    const targetReducer = 'SEARCH';
    const path = endPoint + '&entries=100';
    const [searchValue, setSearchValue] = useState('')

    const dispatch = useDispatch()

    const handleSearch = () => {
        if (searchValue !=''){
            dispatch(fetchData(1, path + '&search_columns=wisma.nama&search_key='+searchValue, targetReducer));
        }else{
            dispatch(fetchData(1, path , targetReducer));
        }
    };

    useEffect(() => {
    }, [dispatch])

    return (
        <View style={styles.container}>

            <TextInput
                style={{
                    backgroundColor: 'white',
                    width: Cons.sw1 - 150,
                    borderRadius: 5,
                    height: 40,

                }}
                placeholder="Search Wisma"
                value={searchValue}
                onChangeText={setSearchValue}
                onSubmitEditing={handleSearch}
            />
            <TouchableOpacity onPress={handleSearch} style={{
                // width          : 70,
                backgroundColor: 'white',
                padding: 10,
                marginLeft: 10,
                borderRadius: 5,

            }}>
                <Text style={{ color: Cons.logoColor2 }}>Search</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        flex: 1,
    },
});

export default CusHeader;
