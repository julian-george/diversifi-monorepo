import React from "react";
import styles from "./styles.module.scss";
import {ClimbingBoxLoader} from "react-spinners";

export interface Props{
    children?: React.ReactChild | React.ReactChild[];
}

// let selection = document.querySelector('select');
// let result = document.querySelector('h2');
// selection?.addEventListener('change', ()=>{
//     result.innerText = selection.options[selection?.selectedIndex].text;
//     console.log(result?.innerText);
// })


let countries = [
    "	Albania		",
    "	Algeria		",
    "	Argentina		",
    "	Australia		",
    "	Austria		",
    "	Azerbaijan		",
    "	Bangladesh		",
    "	Belarus		",
    "	Belgium		",
    "	Bolivia		",
    "	Bosnia and Herzegovina		",
    "	Botswana		",
    "	Brazil		",
    "	Brunei		",
    "	Bulgaria		",
    "	Cambodia		",
    "	Canada		",
    "	Chile		",
    "	China		",
    "	Colombia		",
    "	Costa Rica		",
    "	Croatia		",
    "	Cyprus		",
    "	Czech Republic		",
    "	Côte D'Ivoire		",
    "	Denmark		",
    "	Dominican Republic		",
    "	Ecuador		",
    "	Egypt		",
    "	El Salvador		",
    "	Estonia		",
    "	Finland		",
    "	France		",
    "	Georgia		",
    "	Germany		",
    "	Ghana		",
    "	Greece		",
    "	Guadeloupe		",
    "	Guam		",
    "	Guatemala		",
    "	Honduras		",
    "	Hong Kong		",
    "	Hungary		",
    "	Iceland		",
    "	India		",
    "	Indonesia		",
    "	Iraq		",
    "	Ireland		",
    "	Israel		",
    "	Italy		",
    "	Jamaica		",
    "	Japan		",
    "	Jordan		",
    "	Kazakhstan		",
    "	Kenya		",
    "	Kosovo		",
    "	Kuwait		",
    "	Kyrgyzstan		",
    "	Latvia		",
    "	Lithuania		",
    "	Malawi		",
    "	Malaysia		",
    "	Mexico		",
    "	Moldova		",
    "	Mongolia		",
    "	Morocco		",
    "	Mozambique		",
    "	Myanmar		",
    "	Namibia		",
    "	Nepal		",
    "	Netherlands		",
    "	New Zealand		",
    "	Nicaragua		",
    "	Nigeria		",
    "	North Macedonia		",
    "	Norway		",
    "	Pakistan		",
    "	Panama		",
    "	Paraguay		",
    "	Peru		",
    "	Philippines		",
    "	Poland		",
    "	Portugal		",
    "	Puerto Rico		",
    "	Romania		",
    "	Russia		",
    "	Rwanda		",
    "	Réunion		",
    "	Saudi Arabia		",
    "	Serbia		",
    "	Singapore		",
    "	Slovakia		",
    "	Slovenia		",
    "	South Africa		",
    "	South Korea		",
    "	Spain		",
    "	Sri Lanka		",
    "	Sweden		",
    "	Switzerland		",
    "	Taiwan		",
    "	Tanzania		",
    "	Thailand		",
    "	Trinidad & Tobago		",
    "	Tunisia		",
    "	Turkey		",
    "	USA		",
    "	Uganda		",
    "	Ukraine		",
    "	United Arab Emirates		",
    "	United Kingdom		",
    "	Uruguay		",
    "	Uzbekistan		",
    "	Venezuela		",
    "	Vietnam		",
    "	Zambia		",
    "	Zimbabwe		"
];

export default class Dropdown extends React.Component{
    state:any ={}
    constructor(props: any){
        super(props);
        this.state = {
            country: "",
            trigger: false,
        }
    }

    optionMaker(){
        countries.map((country) => {
            return <option>{country}</option>
        });
    }

    conditionalRender(){
        if(this.state.trigger == true){
            return (
                <div className={styles.progressComponent}>
                    Personalizing Results
                    <div className={styles.progress}>
                        <ClimbingBoxLoader size={20} css=""/>
                    </div>
                </div>
            )
        }
    }

    render(){
        return (
            <div className={styles.dropdownParent}>
                <select id="comboBox" className={styles.comboBox} placeholder="Search here.." onChange={(event) => this.setState({country: event.target.value, trigger: true})}>
                    <option value="" disabled selected>Choose your country</option>
                    {countries.map((key) => {
                        return <option value={key}>{key}</option>;
                     })}
                </select>
                {this.state.country}
                {this.conditionalRender()}
            </div>
        ); 
    }

    
}
