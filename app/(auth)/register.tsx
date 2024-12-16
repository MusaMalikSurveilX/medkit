import { Platform, Text, View, StyleSheet, TextInput, TouchableOpacity, Pressable } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, ImageBackground } from 'expo-image';
import tw from "twrnc";
import { Input } from '@rneui/themed';
import { Formik } from "formik";
import * as Yup from "yup";
import { Redirect, Link } from "expo-router";
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';

const PlaceholderImage = require('@/assets/images/medkit_by_fortnite.png');

const validation = Yup.object().shape({
    email: Yup.string().required('Email Required').email().label("Email"),
    password: Yup.string().required('Password Required').min(4).label("Password"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match").required("Required"),
    firstName: Yup.string().required('First Name Required').label("First Name"),
    lastName: Yup.string().required('Last Name Required').label("Last Name"),
    username: Yup.string().required('Username Required').min(3).label("Username")
});

type RegisterFormValues = {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    username: string;
};

const Register = () => {
  const handleRegister = async (values: RegisterFormValues) => {
    try {
      // Sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (authError) throw authError;

      // Update the profile with additional information
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          first_name: values.firstName,
          last_name: values.lastName,
          username: values.username,
        })
        .eq('id', authData.user!.id);

      if (profileError) throw profileError;

      alert('Registration successful! Please check your email for verification.');
      router.replace('/(auth)/welcome');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ImageBackground source={require('@/assets/images/bg.png')} style={{width: '100%', height: '100%'}}>
      <SafeAreaView className="fslex-row flex">
        <View style={styles.header}>
          <Image source={require('@/assets/images/add.png')} style={styles.image}></Image>
          <Text style={styles.title}>Sign Up</Text>
      
          <Formik 
            initialValues={{
              email: "",
              password: "",
              confirmPassword: "",
              firstName: "",
              lastName: "",
              username: ""
            }}
            onSubmit={handleRegister}
            validationSchema={validation}
          >
            {({handleChange, handleBlur, handleSubmit, values, errors, touched})=>(
              <View style={styles.form}>
                <TextInput
                  style={styles.input}
                  placeholder="First Name"
                  placeholderTextColor="#cbc7f4"
                  onChangeText={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                  value={values.firstName}
                />
                {errors.firstName && touched.firstName && (
                  <Text style={styles.errorText}>{errors.firstName}</Text>
                )}

                <TextInput
                  style={styles.input}
                  placeholder="Last Name"
                  placeholderTextColor="#cbc7f4"
                  onChangeText={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  value={values.lastName}
                />
                {errors.lastName && touched.lastName && (
                  <Text style={styles.errorText}>{errors.lastName}</Text>
                )}

                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  placeholderTextColor="#cbc7f4"
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                />
                {errors.username && touched.username && (
                  <Text style={styles.errorText}>{errors.username}</Text>
                )}

                <TextInput
                  style={styles.input}
                  placeholder="Create Email"
                  placeholderTextColor="#cbc7f4"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType='email-address'
                />
                {/* Error */}
                {errors.email && touched.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                )}

                <TextInput
                  style={styles.input}
                  placeholder="Create Password"
                  placeholderTextColor="#cbc7f4"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry={true}
                />

                {/* Error */}
                {errors.password && touched.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                )}

                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor="#cbc7f4"
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                  secureTextEntry={true}
                />
                {/* Error */}
                {errors.confirmPassword && touched.password && (
                    <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}

                {/* Login */}
                <TouchableOpacity onPress={handleSubmit}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>
                      Register
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

export default Register;

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
        width: "35%",
        marginTop: "10%",
        height: "22%",
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
      marginTop: "20%",
      marginBottom: "10%",
      textAlign: "center",
    },
    form: {
      width: "100%",
      alignContent: "center",
      alignItems: "center"
    },
    input: {
      height: 50,
      borderColor: "#ffffff",
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 16,
      marginBottom: 16,
      backgroundColor: "#ffffff",
      color: "#cbc7f4",
      width: "70%"
    },
    errorText: {
      color: "red",
      marginBottom: 8,
      marginTop: 0,
      fontStyle: "italic"
    },
    button: {
      height: 50,
      backgroundColor: "#cbc7f4",
      borderColor: "#ccc",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
      marginTop: 16,
      
      width: 150
    },
    buttonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },
  });