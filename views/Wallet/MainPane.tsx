import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Badge, Button } from 'react-native-elements';
import { inject, observer } from 'mobx-react';
import LinearGradient from 'react-native-linear-gradient';

import NodeInfoStore from './../../stores/NodeInfoStore';
import UnitsStore from './../../stores/UnitsStore';
import BalanceStore from './../../stores/BalanceStore';

interface MainPaneProps {
    navigation: any;
    NodeInfoStore: NodeInfoStore;
    UnitsStore: UnitsStore;
    BalanceStore: BalanceStore;
}

@inject('UnitsStore')
@observer
export default class MainPane extends React.Component<MainPaneProps, {}> {
    render() {
        const { NodeInfoStore, UnitsStore, BalanceStore, navigation } = this.props;
        const {changeUnits, getAmount, units } = UnitsStore;
        const { totalBlockchainBalance, unconfirmedBlockchainBalance, lightningBalance, pendingOpenBalance } = BalanceStore;
        const loading = NodeInfoStore.loading || BalanceStore.loading;

        const BalanceView = () => (
            <React.Fragment>
                <Text style={styles.lightningBalance}>
                    {units && getAmount(lightningBalance)} ⚡
                </Text>
                {pendingOpenBalance > 0 ? <Text style={styles.pendingBalance}>
                    {units && getAmount(pendingOpenBalance)} pending open
                </Text> : null}
                <Text style={styles.blockchainBalance}>
                    {units && getAmount(totalBlockchainBalance)} ⛓️
                </Text>
                {unconfirmedBlockchainBalance ? <Text style={styles.pendingBalance}>
                    {units && getAmount(unconfirmedBlockchainBalance)} pending
                </Text> : null}
            </React.Fragment>
        );

        const SettingsButton = () => (
            <View style={styles.settings}>
                <Button
                    title=""
                    icon={{
                        name: "settings",
                        size: 25,
                        color: "#fff"
                    }}
                    backgroundColor="transparent"
                    onPress={() => navigation.navigate('Settings')}
                    borderRadius={30}
                />
            </View>
        );

        let mainPane;

        if (loading) {
            mainPane = (
                <View style={styles.loadingContainer}>
                    <SettingsButton />
                    <Button
                        title=""
                        loading
                        backgroundColor="transparent"
                        onPress={() => void(0)}
                    />
                </View>
            );
        } else if (!NodeInfoStore.error) {
           mainPane = (
               <View>
                    <LinearGradient colors={['#FAB57F', 'orange', '#ee7600']} style={styles.container}>
                        {NodeInfoStore.nodeInfo && NodeInfoStore.testnet && <View style={styles.testnet}>
                            <Badge value='Testnet' />
                        </View>}
                        <SettingsButton />
                        <TouchableOpacity onPress={() => changeUnits()}>
                            <BalanceView />
                        </TouchableOpacity>
                        <View style={styles.buttons}>
                            <Button
                                title="Send"
                                icon={{
                                    name: "arrow-forward",
                                    size: 25,
                                    color: "red"
                                }}
                                buttonStyle={{ backgroundColor: '#fff' }}
                                color="black"
                                onPress={() => navigation.navigate('Send')}
                                borderRadius={30}
                                raised
                            />
                            <Button
                                title="Receive"
                                icon={{
                                    name: "arrow-downward",
                                    size: 25,
                                    color: "green"
                                }}
                                buttonStyle={{ backgroundColor: '#fff' }}
                                color="black"
                                onPress={() => navigation.navigate('Receive')}
                                borderRadius={30}
                                raised
                            />
                        </View>
                    </LinearGradient>
               </View>
           );
        } else {
            mainPane = (
                <View style={styles.errorContainer}>
                    <Text style={{ color: '#fff', fontSize: 20, marginTop: 20, marginBottom: 25 }}>Error connecting to your node. Please check your settings and try again.</Text>
                    <Button
                        icon={{
                            name: "settings",
                            size: 25,
                            color: "#fff"
                        }}
                        title="Go to Settings"
                        backgroundColor="gray"
                        onPress={() => navigation.navigate('Settings')}
                        borderRadius={30}
                    />
                </View>
            );
        }

        return (
            <React.Fragment>
                {mainPane}
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 25,
        paddingBottom: 50,
        paddingLeft: 10
    },
    loadingContainer: {
        backgroundColor: 'rgba(253, 164, 40, 0.5)',
        paddingTop: 25,
        paddingBottom: 50,
        paddingLeft: 10
    },
    errorContainer: {
        backgroundColor: '#cc3300', // dark red
        paddingTop: 25,
        paddingBottom: 50,
        paddingLeft: 10
    },
    lightningBalance: {
        fontSize: 40,
        color: '#fff'
    },
    blockchainBalance: {
        fontSize: 30,
        color: '#fff'
    },
    pendingBalance: {
        fontSize: 20,
        color: '#fff'
    },
    testnet: {
        alignItems: 'flex-start',
        marginTop: 20,
        marginBottom: -40
    },
    settings: {
        alignItems: 'flex-end',
        marginRight: -20
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: -30
    }
});