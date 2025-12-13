import React from "react";
import { View, Text, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { navbarToggle } from "../redux/slices/adminAuthSlice";


export default function TestComponent() {
  const aside = useSelector((state) => state.adminAuth.aside);
  const dispatch = useDispatch();
  console.log(aside,'aside')

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>Aside: {aside ? "TRUE" : "FALSE"}</Text>
      <Text style={{backgroundColor:"#007A4D"}}>New Button</Text>  
      <Button
        title="Toggle"
        onPress={() => dispatch(navbarToggle())}
      />
    </View>
  );
}
