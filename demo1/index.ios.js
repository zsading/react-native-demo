/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var MOCKED_MOVIES_DATA = [{title:'Title',year:'2015',posters:{thumbnail:'http://i.imgur.com/UePbdph.jpg'}}];
var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';


import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,

} from 'react-native';


class demo1 extends Component {

	constructor(props){
	super(props);
		this.state = {
      dataSource:new ListView.DataSource({
        rowHasChanged:(row1,row2) => row1 !== row2}),
			loaded:false,
		};
}
	componentDidMount(){
		this.fetchData();
	}

 	fetchData(){
 		fetch(REQUEST_URL)
 		.then((response) => response.json())
 		.then((responseData) => {
 			this.setState({
 				dataSource:this.state.dataSource.cloneWithRows(responseData.movies),
        loaded:true,
 			});
 		})
 		.done();
 	}

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

  	return (
      <ListView style={styles.listView} dataSource={this.state.dataSource} renderRow={this.renderMovie}/>
    );
  }

  renderLoadingView(){
  	return(
  		<View style={styles.container}>
        <Text style={styles.title}>
          加载中
        </Text>
      </View>
  	);
  }

  renderMovie(movie){
    return(
      <View style={styles.container}>
         <Image source={{uri:movie.posters.thumbnail}} style={styles.thumbnail}/>
         <View style={styles.rightContainer}>
           <Text style={styles.title}>{movie.title}</Text>
           <Text style={styles.year}>{movie.year}</Text>
         </View> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection:'row'
  },
  rightContainer:{
  	flex:1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  thumbnail:{
  	width:53,
  	height:81,
  },
  title:{
  	fontSize:20,
  	marginBottom:8,
  	textAlign:'center'
  },
  year:{
  	textAlign:'center'
  },
  listView:{
    paddingTop:20,
    backgroundColor:'#F5FCFF',
  },
});

AppRegistry.registerComponent('demo1', () => demo1);
