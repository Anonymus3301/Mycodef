import React, { useState } from 'react';
import Axios from 'axios';
import {Line} from 'react-chartjs-2';

export default class Getdata extends React.Component{
    state={
        results:[],
        name:'',
    };
    
    componentDidMount(){
        Axios.get(`https://codeforces.com/api/user.rating?handle=${this.state.name}`).then(res=>{
            
            this.setState({results:res.data.result});
           
        })
    }
    render(){
        var datal=[];
        var label=[];
        
        console.log(this.state.datal)
        this.state.results.map(val=>{
            datal.push(val.newRating)
            label.push(val.contestName)
        })
        const KPOP = ()=>{
            Axios.get(`https://codeforces.com/api/user.rating?handle=${this.state.name}`).then(res=>{
            console.log(res)
            this.setState({results:res.data.result});
           
        })
        }
        const data={
			labels:label,
			datasets:[{
				label:"Ratings",
				data: datal,
				borderColor: ['purple'],
				borderWidth: 1.5
			  }]
		}
		const options={
			scales: {
				xAxes: [{
					gridLines: {
						display:false
					}
				}],
				yAxes: [{
					gridLines: {
						display:false
					}   
				}]
			}
        }
        return (
            <div className="PAP">
                <input onChange={(e)=>{
                    this.state.name=e.target.value;
                    console.log(e.target.value);
                }}></input>
                <button onClick={KPOP}>Submit</button>
                <Line height={200} data={data} options={options} />
            </div>
            
        )
    }
}