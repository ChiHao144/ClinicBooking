// import { useEffect, useState } from "react";
// import { Card, Text } from "react-native-paper";
// import { SafeAreaView } from "react-native-safe-area-context";
// import Apis, { endpoints } from "../../configs/Apis";
// import { ScrollView, View } from "react-native";
// import RenderHTML from "react-native-render-html";


// const HospitalDetail = ({ route }) => {

//     const [hospitaldetail, setHospitalDetail] = useState([]);
//     const hospitalId = route.params?.hospitalId;

//     const loadingHospitalDetail = async () => {
//         let res = await Apis.get(endpoints['hospital-details'](hospitalId));
//         setHospitalDetail(res.data);
//     }

//     useEffect(() => {
//         loadingHospitalDetail();
//     }, [hospitalId]);

//     const renderHospitalDetail = (item) => {
//         return (
//             <ScrollView>
//                 <Card>
//                     <Card.Title title={item.name}  />
//                     <Card.Cover source={{ uri: item.image }} />
//                     <Card.Content>
//                         {/* <Text>{item.description}</Text> */}
//                         {/* <RenderHTMLSource source={{html: item.description}}/> */}
//                         <RenderHTML source={{html: item.description}} />
//                     </Card.Content>
//                 </Card>
//             </ScrollView>

//         );
//     };

//     return (
//         <SafeAreaView>
//             {renderHospitalDetail(hospitaldetail)}
//         </SafeAreaView>
//     );
// };

// export default HospitalDetail;


import { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Apis, { endpoints } from "../../configs/Apis";
import RenderHTML from "react-native-render-html";

const HospitalDetail = ({ route }) => {
  const [hospitalDetail, setHospitalDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  const hospitalId = route.params?.hospitalId;
  const contentWidth = Dimensions.get("window").width;

  const loadHospitalDetail = async () => {
    try {
      let res = await Apis.get(endpoints["hospital-details"](hospitalId));
      setHospitalDetail(res.data);
    } catch (error) {
      console.error("Failed to fetch hospital details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHospitalDetail();
  }, [hospitalId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Đang tải thông tin bệnh viện...</Text>
      </SafeAreaView>
    );
  }

  if (!hospitalDetail) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text>Không tìm thấy thông tin bệnh viện.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Card style={styles.card}>
          <Card.Title title={hospitalDetail.name} titleStyle={styles.title} />
<<<<<<< HEAD
          <Card.Cover source={{ uri: hospitalDetail.logo }} style={styles.image} />
          <Card.Content style={styles.content}>
            <RenderHTML
              contentWidth={contentWidth - 32}
              source={{ html: hospitalDetail.description || "<p>Không có mô tả</p>" }}
            />
=======
          <Card.Cover source={{ uri: hospitalDetail.image }} style={styles.image} />
          <Card.Content>
            <RenderHTML source={{ html: hospitalDetail.description}} />
>>>>>>> 81adef28e3bb0e197ec41fc79dfa58733d534cfb
          </Card.Content>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scroll: {
    padding: 16,
  },
  card: {
    elevation: 3,
    borderRadius: 8,
    overflow: "hidden",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    height: 200,
    resizeMode: "cover",
  },
  content: {
    marginTop: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default HospitalDetail;
