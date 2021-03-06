import React, { useState, useEffect } from 'react';
import ItemInfo from "../components/DisplayInfo/ItemInfo";
import Colors from "../Constants/Colors";
import MapView, { Marker, Callout } from "react-native-maps";
import { StyleSheet, Text, View, Image, FlatList, AsyncStorage, } from 'react-native';

const NewDisplayInformationScreen = props => {
    const [info, setInfo] = useState([]);
    const [error, setError] = useState(false);


    async function fetchData(){
        const result = props.navigation.state.params.result;
        await read(result);
    }
    const titleId = {
        PUNKTTILKNYTNING: 100096,
        ANSIKTSSIDERETTETMOT: 1894,
        SKILTNUMMER: 5530,
        OPPSETTINGSDATO: 2108,
        GEOMETRIPUNKT: 4795,
        TEKST: 1910,
        PLASSERINGSKODE: 5128,
        TOSIDIGPLATEMEDULIKEMOTIV: 9484,
        STORRELSE: 1970,
        HOYDE: 1588,
        BREDDE: 1328,
        SKILTFORM: 1892,
        TEKSTOGSYMBOLHOYDE: 1912,
        FARGE: 1294,
        BELYSNING: 1879,
        FOLIEKLASSE: 1921,
        KLAPPSKILT: 8828,
        VEDTAKSNUMMER: 1890,
        SKIFTETDATO: 2107,
        ARKIVNUMMER: 9154,
        EIER: 11826,
        VEDLIKEHOLDSANSVARLIG: 8064,




    };

    const read = async result => {
        let whatIsCurrentFilter = await AsyncStorage.getItem('standard');
        let getCurrentFilter = await AsyncStorage.getItem(whatIsCurrentFilter);
        let checkFilter = await JSON.parse(getCurrentFilter);
        setInfo([]);
        addItem("id", result.id);
        if(checkFilter.metadata === true){
            addItem("Navn", result.metadata.type.navn);
            addItem("Id for Skiltplate", result.metadata.type.id);
            addItem("Start Dato", result.metadata.startdato);
            addItem("Sist Modifisert", result.metadata.sist_modifisert);
            addItem("Direkte Link", result.href);
        } if(checkFilter.geometri === true){
            addItem("wkt", result.geometri.wkt);
            addItem("srid", result.geometri.srid);
            addItem("Egengeometri", result.geometri.egengeometri)
        } if(checkFilter.lokasjon === true){
            addItem("Kommune", result.lokasjon.kommuner[0]);
            addItem("Fylker", result.lokasjon.fylker[0]);
            addItem("Kortform", result.lokasjon.vegsystemreferanser[result.lokasjon.vegsystemreferanser.length-1].kortform)

            addItem("Stedfesting type", result.lokasjon.stedfestinger[0].type);
            addItem("Stedfesting veglenkesekvensid", result.lokasjon.stedfestinger[0].veglenkesekvensid);
            addItem("Stedfesting relativposisjon", result.lokasjon.stedfestinger[0].relativPosisjon);
            addItem("Stedfesting kortform", result.lokasjon.stedfestinger[0].kortform);
            addItem("Stedfesting retning", result.lokasjon.stedfestinger[0].retning);
            addItem("Stedfesting sideposisjon", result.lokasjon.stedfestinger[0].sideposisjon);
        } if(checkFilter.relasjoner === true){
            addItem("Forelder listeid", result.relasjoner.foreldre[0].listeid);
            addItem("Forelder id", result.relasjoner.foreldre[0].id);
            addItem("Forelder type", result.relasjoner.foreldre[0].type.navn);
            addItem("Forelder type id", result.relasjoner.foreldre[0].type.id);
            addItem("Forelder objektid", result.relasjoner.foreldre[0].vegobjekter[0]);
        } if(checkFilter.egenskaper.PunktTilKnytning === true){
            for(let i in result.egenskaper){
                if(result.egenskaper[i].id === titleId.PUNKTTILKNYTNING){
                    addItem("navn", result.egenskaper[i].navn);
                    addItem("egenskapstype", result.egenskaper[i].egenskapstype);
                    addItem("datatype", result.egenskaper[i].datatype);
                    addItem("stedfestingstype", result.egenskaper[i].stedfestingstype);
                    addItem("veglenkesekvensid", result.egenskaper[i].veglenkesekvensid);
                    addItem("relativPosisjon", result.egenskaper[i].relativPosisjon);
                    addItem("retning", result.egenskaper[i].retning);
                    addItem("sideposisjon", result.egenskaper[i].sideposisjon);
                }
            }
        } if(checkFilter.egenskaper.AnsiktssideRettetMot === true) {
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === titleId.ANSIKTSSIDERETTETMOT){
                    addItem(result.egenskaper[i].navn, result.egenskaper[i].verdi);
                    break;
                }
            }
        } if(checkFilter.egenskaper.Skiltnummer === true) {
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === titleId.SKILTNUMMER){
                    addItem(result.egenskaper[i].navn, result.egenskaper[i].verdi) + "-" + result.egenskaper[i].enum_id;
                    addItem('Id av skilttype', result.egenskaper[i].enum_id);
                    break;
                }
            }
        } if(checkFilter.egenskaper.Oppsettingsdato === true) {
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === titleId.OPPSETTINGSDATO){
                    addItem(result.egenskaper[i].navn, result.egenskaper[i].verdi);

                    break;
                }
            }
        } if(checkFilter.egenskaper.GeometriPunkt === true){
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === titleId.GEOMETRIPUNKT){
                    addItem(result.egenskaper[i].navn, result.egenskaper[i].verdi);
                    /*
                    addItem("medium",  result.egenskaper[i].medium);
                    addItem("medium_nvdb", result.egenskaper[i].medium_nvdb);
                    addItem("lengde", result.egenskaper[i].lengde);
                    addItem("høydereferanse", result.egenskaper[i].høydereferanse);

                    addItem("Kvalitet målemetode", result.egenskaper[i].kvalitet.målemetode);
                    addItem("Kvalitet nøyaktighet",  result.egenskaper[i].kvalitet.nøyaktighet);
                    addItem("Kvalitet synbarhet", result.egenskaper[i].kvalitet.synbarhet);
                    addItem("Kvalitet målemetodeHøyde", result.egenskaper[i].kvalitet.målemetodeHøyde);
                    addItem("Kvalitet nøyaktighetHøyde", result.egenskaper[i].kvalitet.nøyaktighetHøyde);
                    addItem("Kvalitet maksimaltAvvik", result.egenskaper[i].kvalitet.maksimaltAvvik);
                    */
                }
            }
        } if(checkFilter.egenskaper.Tekst === true){
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === titleId.TEKST){
                    addItem(result.egenskaper[i].navn, result.egenskaper[i].verdi);
                    break;
                }
            }
        } if(checkFilter.egenskaper.Plasseringskode === true){
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === titleId.PLASSERINGSKODE){
                    addItem(result.egenskaper[i].navn, result.egenskaper[i].verdi);
                    break;
                }
            }
        } if(checkFilter.egenskaper.ToSidigPlateMedUlikeMotiv === true){
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === titleId.TOSIDIGPLATEMEDULIKEMOTIV){
                    addItem(result.egenskaper[i].navn, result.egenskaper[i].verdi);
                    break;
                }
            }
        } if(checkFilter.egenskaper.Storrelse === true){
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === titleId.STORRELSE){
                    addItem(result.egenskaper[i].navn, result.egenskaper[i].verdi);
                    break;
                }
            }
        } if(checkFilter.egenskaper.Hoyde === true){
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === titleId.HOYDE){
                    addItem(result.egenskaper[i].navn, result.egenskaper[i].verdi);
                    break;
                }
            }
        } if(checkFilter.egenskaper.Bredde === true){
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === titleId.BREDDE){
                    addItem(result.egenskaper[i].navn, result.egenskaper[i].verdi);
                    break;
                }
            }
        } if(checkFilter.egenskaper.Skiltform === true){
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === titleId.SKILTFORM){
                    addItem(result.egenskaper[i].navn, result.egenskaper[i].verdi);
                    break;
                }
            }
        } if(checkFilter.egenskaper.TekstOgSymbolhoyde === true){
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === titleId.TEKSTOGSYMBOLHOYDE){
                    addItem(result.egenskaper[i].navn, result.egenskaper[i].verdi);
                    break;
                }
            }
        } if(checkFilter.egenskaper.Farge === true){
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === titleId.FARGE){
                    addItem(result.egenskaper[i].navn, result.egenskaper[i].verdi);
                    break;
                }
            }
        } if(checkFilter.egenskaper.Belysning === true){
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === titleId.BELYSNING){
                    addItem(result.egenskaper[i].navn, result.egenskaper[i].verdi);
                    break;
                }
            }
        } if(checkFilter.egenskaper.Folieklasse === true){
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === titleId.FOLIEKLASSE){
                    addItem(result.egenskaper[i].navn, result.egenskaper[i].verdi);
                    break;
                }
            }
        } if(checkFilter.egenskaper.Klappskilt === true){
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === titleId.KLAPPSKILT){
                    addItem(result.egenskaper[i].navn, result.egenskaper[i].verdi);
                    break;
                }
            }
        } if(checkFilter.egenskaper.Vedtaksnummer === true){
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === titleId.VEDTAKSNUMMER){
                    addItem(result.egenskaper[i].navn, result.egenskaper[i].verdi);
                    break;
                }
            }
        } if(checkFilter.egenskaper.SkiftetDato === true){
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === titleId.SKIFTETDATO){
                    addItem(result.egenskaper[i].navn, result.egenskaper[i].verdi);
                    break;
                }
            }
        } if(checkFilter.egenskaper.Arkivnummer === true){
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === titleId.ARKIVNUMMER){
                    addItem(result.egenskaper[i].navn, result.egenskaper[i].verdi);
                    break;
                }
            }
        } if(checkFilter.egenskaper.Eier === true){
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === titleId.EIER){
                    addItem(result.egenskaper[i].navn, result.egenskaper[i].verdi);
                    break;
                }
            }
        } if(checkFilter.egenskaper.Vedlikeholdsansvarlig === true){
            for(let i in result.egenskaper){
                if (result.egenskaper[i].id === titleId.VEDLIKEHOLDSANSVARLIG){
                    addItem(result.egenskaper[i].navn, result.egenskaper[i].verdi);
                    break;
                }
            }
        }
    };

    const createSimpleView = result => {
        if(typeof result === "undefined"){
            setError(true);
        }else{
            addItem("ID", result.id);
            addItem("Direkte Link", result.href);
            addItem("Start Dato", result.metadata.startdato);
            addItem("Sist Modifisert", result.metadata.sist_modifisert);
        }
    }

    const addItem = (id, value) => {
        setInfo(item => [
          ...item,
          { id: id, value: value }]);
      };

    useEffect(() => {
        fetchData();
    }, [])

    if(error){
        return(
            <View style={styles.errorContainer}>
                <Text>Vi fant desverre ingen passende skilt på denne strekningen</Text>
            </View>
        )
    }

    return(
        <View style={styles.container}>
            <View style={styles.topView}>
                <View style={styles.imageView}>
                    <Image style={styles.imageStyle} source={{uri: props.navigation.state.params.image.uri}}/>
                </View>
                <View style={styles.lineVertical}></View>
                <View style={styles.buttonView}>
                <MapView 
                  initialRegion={{
                      latitude: props.navigation.state.params.coordinates.latitude, 
                      longitude: props.navigation.state.params.coordinates.longitude,
                      latitudeDelta: 0.007,
                      longitudeDelta: 0.007,
                  }}
                  style={StyleSheet.absoluteFillObject}
                  scrollEnabled={false}
                  zoomEnabled={false}
                  rotateEnabled={false}>
                      <Marker
                          coordinate = { props.navigation.state.params.coordinates }
                          >
                        </Marker>
                  </MapView>
                </View>
            </View>
            <View style={styles.bottomView}>
                <View style={styles.line}></View>
                <FlatList style={styles.list1}
                keyExtractor={(item, index) => index.toString()}
                data={info}
                renderItem={itemData => <ItemInfo id={itemData.item.id + ":"} value={itemData.item.value}/>} 
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      topView: {
          flex: 1,
          flexDirection: "row"
      },
      imageView: {
          backgroundColor: "#fff",
          flex: 1 ,
      },
      imageStyle: {
          flex: 1,
          width: undefined, 
          height: undefined,
          marginTop: 5,
          marginLeft: 18,
          marginBottom: 5,
          marginRight: 5
      },
      buttonView: {
        flex: 1,
        marginTop: 5,
        marginRight: 18,
        marginBottom: 5,
        marginLeft: 5
      },
      bottomView: {
          flex: 1,
      },
      line: {
        borderBottomColor: "#a38e8c",
        borderBottomWidth: .8,
        marginLeft: 18,
        marginRight: 18,
    },
    lineVertical: {
        borderColor: "#a38e8c",
        borderLeftWidth: .8,
        marginBottom: 5,
        marginTop: 5
    },
    heading: {
        fontSize: 18,
        marginLeft: 5,
        marginTop: 10
    }
});

export default NewDisplayInformationScreen;