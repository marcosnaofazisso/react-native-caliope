import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function (props) {
    const navigation = useNavigation();
    return <RoupaBox {...props} navigation={navigation} />;
}
class RoupaBox extends React.Component {
    constructor(props) {
        super(props);

        title: this.props.title;
        photo: this.props.photo;
        price: parseFloat(this.props.price).toPrecision(2);
        description: this.props.description;
        discount: this.props.discount;
        type: this.props.type;
    }

    render() {
        const item = this.props;

        return (
            <View style={styles.imgContainer}>
                <TouchableOpacity
                    style={styles.singularContainer}
                    onPress={this.props.onPress}
                >
                    <Image source={item.photo} resizeMode="contain" style={styles.img} />

                    <Text style={styles.txtImg}>{item.title} </Text>

                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    imgContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
    },
    singularContainer: {
        alignItems: "center",
    },
    img: {
        // alignSelf: "center",
        width: 250,
        height: 250,
    },
    txtImg: {
        alignSelf: "flex-start",
        fontWeight: "bold",
    },
    priceImg: {
        alignSelf: "flex-start",
        color: "black",
    },
});
