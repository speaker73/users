import React,{ Component } from 'react';
import {View, Text, ScrollView,FlatList, Platform} from 'react-native';
import User from './User';
import axios from 'axios';


export default class Users extends Component {
	
	constructor(props) {
	  super(props);
	  this.state = {
	  			users:[],
	  			nextSince:0,
	  			load:100,
		};
	}
	async getUsers(){
		let {nextSince} = this.state;
		let {data:users} = await axios({
			method:'get',
			url:'https://api.github.com/users',
			params: {
			    per_page: 100,
			    since:String(nextSince),
  			}
		});
		nextSince++;
		console.log(users)
		users = [...this.state.users, ...users];
		this.setState({users, nextSince, load:0});
	}
	componentDidMount(){
		this.getUsers();
	}	
	render() {
      return (
        <View style={{maringBottom:20}}>
		  <FlatList 
		  			ListFooterComponent={()=><View style={{height:this.state.load}}><Text style={{color:'blue'}}>Loading...</Text></View>}
					keyExtractor={(item, index) => index}
		  			data={this.state.users} 
		  			renderItem={ ({item})=><User user={item}>{item.login}</User>}
		  			onEndReachedThreshold={1}
  					onEndReached={({ distanceFromEnd }) => {
    					console.log('on end reached ', distanceFromEnd, this.state.nextSince);
    					if(distanceFromEnd > 0){
    						this.setState({load:100});
    						this.getUsers();
    					}
  					}}
		  />
	    </View>
      );
  }
}
