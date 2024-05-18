import React from 'react';
import { Cons } from './Cons';
import { HStack, VStack, View, Text } from '@gluestack-ui/themed';
import PagerView from 'react-native-pager-view';
import { TabView, SceneMap } from 'react-native-tab-view';
import ViewPager from '@react-native-community/viewpager';

const FirstRoute = () => (
    <View style={{ backgroundColor: '#ff4081' }} />
);

// Komponen halaman kedua
const SecondRoute = () => (
    <View style={{ backgroundColor: '#673ab7' }} />
);

// Komponen halaman ketiga
const ThirdRoute = () => (
    <View style={{ backgroundColor: '#ff9800' }} />
);

const CusList = ({ dataTable }) => {

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
        { key: 'third', title: 'Third' },
    ]);

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute,
    });

    // if (!Array.isArray(dataTable)) {
    //     return <View>
    //         <Text>Loading . . .</Text>
    //     </View>;
    // }

    // const rows = [];

    // for (let i = 0; i < dataTable.length; i++) {
    //     const rowData = dataTable[i];

    //     rows.push(
    //         <VStack key={i} style={{
    //             borderWidth: 0.5,
    //             borderColor: Cons.textColor,
    //             borderRadius: 10,
    //             width: Cons.sw1 - 20,
    //             padding: 10,
    //             marginBottom: 10,
    //         }}>
    //             <HStack justifyContent='space-between'>
    //                 <Text style={{ fontSize: 20, fontWeight: 800, }}>{rowData.nomor}</Text>
    //                 {rowData.status_tike === 'DRAFT' ? (
    //                     <View style={{ backgroundColor: Cons.textColor, padding: 5, borderRadius: 5, }}>
    //                         <Text style={{ fontSize: 16, color: 'white' }}>DRAFT</Text>
    //                     </View>
    //                 ) : rowData.status_tiket === 'WAITING_APPROVAL' ? (
    //                     <View style={{ backgroundColor: Cons.logoColor2, padding: 5, borderRadius: 5, }}>
    //                         <Text style={{ fontSize: 16, color: 'white' }}>WAITING APPROVAL</Text>
    //                     </View>
    //                 ) : rowData.status_tiket === 'COMPLETE' ? (
    //                     <View style={{ backgroundColor: Cons.positiveColor, padding: 5, borderRadius: 5, }}>
    //                         <Text style={{ fontSize: 16, color: 'white' }}>COMPLETE</Text>
    //                     </View>
    //                 ) : (
    //                     <View style={{ backgroundColor: Cons.textColor, padding: 5, borderRadius: 5, }}>
    //                         <Text style={{ fontSize: 16, color: 'white' }}>DRAFT</Text>
    //                     </View>
    //                 )}
    //             </HStack>
    //             <HStack justifyContent='space-between'>
    //                 <Text>{rowData.wisma.nama}</Text>
    //                 <Text>{rowData.tanggal}</Text>
    //             </HStack>

    //         </VStack>
    //     );
    // }

    return (
        // <View style={{
        //     flex: 1,
        //     justifyContent: 'start',
        //     alignItems: 'center',
        //     padding: 20,
        // }}>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: Cons.sw1 }}
            />
        // </View>
    );
};

export default CusList;