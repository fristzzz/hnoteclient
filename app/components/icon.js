import React from "react";
import { Text, Image, View } from "react-native";


const Icon = ({ name, size }) => {

    return (
        <View>
            {
                name == 'note' ?
                    <Image source={require("../assets/icon/note.png")} style={{ height: size, width: size }}></Image>
                    : <Image source={require("../assets/icon/user.png")} style={{ height: size, width: size }}></Image>

            }

        </View>
    )
};

export default Icon;