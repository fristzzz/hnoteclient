
import React, { Component } from 'react'
import CookieManager from '@react-native-cookies/cookies'
import host from '../utils/hostdomin'
import { StyleSheet, View, Text, Image, TextInput, Button } from 'react-native'
import storage from '../utils/storage'

export default class LoginScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {/* <Image style={styles.logo} source={{ uri: 'http://img1.vued.vanthink.cn/vued1c28f0d1755035791aef1741bf03aa70.jpg' }} /> */}
                <View style={styles.signinWrap}>
                    <Text style={styles.welcome}>
                        欢迎登录
                    </Text>
                    <Text style={styles.desc}>
                        Welcome to SignIn!
                    </Text>
                    <View style={styles.inputGroup}>
                        <TextInput style={styles.formControl} placeholder="username" onChangeText={(text) => this.setState({ username: text })} />
                    </View>
                    <View style={styles.inputGroup}>
                        <TextInput style={styles.formControl} placeholder="password" onChangeText={(text) => this.setState({ password: text })} />
                    </View>
                    <Button style={styles.btn} styleDisabled={{ color: 'red' }} onPress={this._handlePress.bind(this)} title={" 登 录"}>

                    </Button>
                </View>

            </View>
        )
    }

    _handlePress($event) {
        console.log(`got username: ${this.state.username},\ngot password: ${this.state.password} `);
        fetch(host + '/user/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_name: this.state.username,
                password: this.state.password,
            })
        })
            .then((response) => {
                let cookie = response.headers.get('set-cookie')
                console.log(cookie);
                storage.save({
                    key: 'user',
                    data: {
                        username: this.state.username,
                        password: this.state.password,
                    },
                    expires: null,
                });
                let coos: string[] = cookie.split(';')
                let sname = (coos[0].split('='))[0];
                let svalue = (coos[0].split('='))[1]
                storage.save({
                    key: 'session',
                    data: {
                        sessionName: sname,
                        sessionValue: svalue,
                    }
                })
            })
            .catch((err) => {
                console.log('log in failed\n');
                alert('log in failed!');
                console.log(err);
            })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1e7ce',
        //flexWrap: 'wrap',
    },

    logo: {
        flex: .3,
        height: 120,
        marginBottom: 10,
    },
    signinWrap: {
        flex: .5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        backgroundColor: '#f1e7ce',
    },
    welcome: {
        fontSize: 16,
        color: '#555555',
        marginBottom: 15,
        textAlign: 'center',
    },
    desc: {
        fontSize: 14,
        color: '#999999',
        textAlign: 'center',
        marginBottom: 25,
    },

    inputGroup: {
        marginBottom: 10,
        width: 200,

    },

    formControl: {
        marginLeft: 10,
        marginRight: 10,
        height: 35,
        borderWidth: 1,
        paddingLeft: 2,
        borderColor: '#dddddd',
        backgroundColor: '#ffffff',
        fontSize: 14,

    },

    btn: {
        marginLeft: 10,
        marginRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 16,
        backgroundColor: '#3498db',
        color: '#ffffff',
    }
})