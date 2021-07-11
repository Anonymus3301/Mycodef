import React,{Component,useEffect,useState} from 'react';
import {Line} from 'react-chartjs-2';
import Axios from 'axios';
import RatingData from './/RatingData';


function RatingChart(){

    

		const data={
			labels:[1,2,3,4,5,6,7],
			datasets:[{
				label:"Earnings",
				data: [1,2,3,4,5,6,7],
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
		return(
			<div className="Chart">
                <RatingData/>
                <Line height={200} data={data} options={options} />
            </div>
				
			
		)
	
}
export default RatingChart;