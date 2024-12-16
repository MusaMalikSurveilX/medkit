import { Platform, Text, View, StyleSheet, TextInput, TouchableOpacity, Pressable } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, ImageBackground } from 'expo-image';
import tw from "twrnc";
import { Input } from '@rneui/themed';
import { Formik } from "formik";
import * as Yup from "yup";
import { Redirect, Link } from "expo-router";


const validation = Yup.object().shape({
    prompt: Yup.string().required().label("Prompt"),
})



const PromptPage = () => {
  return (
    
    <ImageBackground source={require('@/assets/images/mainbg.png')} style={{width: '100%', height: '100%'}}>
    <SafeAreaView className="fslex-row flex">
    <View style={styles.header}>
        <Image source={require('@/assets/images/add.png')} style={styles.image}></Image>
        <Text style={styles.title}>How can I help you today?</Text>
        <View style={styles.reg}>
            <Link style={styles.reg} href="/(auth)/welcome">routetestback</Link>
        </View>
        <View style={styles.main}>
        <Formik 
            initialValues={{ prompt: ""}}
            onSubmit={(values) => console.log(values)}
            validationSchema={validation}
        >
        {({handleChange, handleBlur, handleSubmit, values, errors, touched})=>(
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Prompt"
                    placeholderTextColor="#cbc7f4"
                    onChangeText={handleChange("prompt")}
                    onBlur={handleBlur("prompt")}
                    value={values.prompt}
                    keyboardType='email-address'
                />
                {/* Error */}
                {/* {errors.prompt && touched.prompt && (
                    <Text style={styles.errorText}>{errors.prompt}</Text>
                )} */}

                {/* Login */}
                <TouchableOpacity onPress={handleSubmit}>
                    <View style={styles.button}>
                      <Image source={require('@/assets/images/send.png')} style={{width: "40%", height: "40%", marginTop: "3%"}}></Image>
                    </View>
                </TouchableOpacity>
            </View>
        )}
        </Formik>
        </View>
    </View>
    </SafeAreaView>
    </ImageBackground>
  
  );
}

export default PromptPage;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
      backgroundColor: "#f5f5f5",
    },
    image: {
        alignItems: "center",
        alignContent: "center",
        width: "45%",
        marginTop: "10%",
        height: "24%",
    },
    main: {
      alignItems: "center",
      alignContent: "center",
      marginTop: "50%",
    },
    icon: {
      alignItems: "center",
      alignContent: "center",
      width: "10%",
      height: "10%",
      color: "red"
  },
    reg: {
        marginTop: 5,
        alignItems: "center",
        alignContent: "center",
        color: "#c4bce9",
    },
    header: {
        alignItems: "center",
        alignContent: "center",
        
    },
    title: {
      fontSize: 32,
      color: "#c4bce9",
      fontWeight: "bold",
      marginTop: "30%",
      marginBottom: "10%",
      textAlign: "center",
    },
    form: {
      width: "100%",
      alignContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    input: {
      height: 60,
      borderColor: "#ffffff",
      borderWidth: 1,
      borderRadius: 25,
      paddingHorizontal: 16,
      marginLeft: "8%",
      backgroundColor: "#ffffff",
      color: "#cbc7f4",
      width: "70%"
    },
    errorText: {
      color: "red",
      marginBottom: 8,
      marginTop: 0,
      textAlign: "center",
      fontStyle: "italic"
    },
    button: {
      height: 60,
      backgroundColor: "#cbc7f4",
      borderColor: "#ccc",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 100,
      marginLeft: "10%",
      width: 60
      
    },
    buttonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },
  });