import React from 'react'
import { Link } from 'react-router-dom'


const Header = () => {
  return (
    <div style={{width: '100%', height: '100px', background: '#1A4D2E', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{width:'1200px', height:'80px', background:'#DEAC80', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
                <Link to={'/'}>NightMarket</Link>
            </div>
            <div>
                <Link to={"/register"}>register</Link>
            </div>
        </div>
    </div>
  )
}

export default Header
