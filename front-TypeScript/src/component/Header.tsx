import React from 'react'
import { Link } from 'react-router-dom'


const Header = () => {
  return (
    <div style={{width: '100%', height: '100px', background: '#1A4D2E', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{width:'1200px', height:'80px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
                <Link to={'/'} style={{textDecoration:'none'}}>
                    <h1 style={{color:'#FAF7F0'}}>NightMarket</h1>
                </Link>
            </div>
            <div style={{height:'30px', width:'240px', display:'flex', justifyContent:'space-between',alignItems:'center', background:'#FFFFFF', borderRadius:'8px', overflow:'hidden'}}>
                <input type="text" placeholder='search' style={{width:'192px', outline:'none', border:'none', borderRadius:'8px', height:'26px', padding:'0 6px'}}/>
                <button style={{background:'#FFFFFF',  border: 'none', borderLeft: '2px solid #000000', height:'24px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <img src="./header/search-svgrepo-com (2).svg" alt="img" style={{width:'22px', height:'22px'}}/>
                </button>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'280px'}}>
                <Link to={"/register"} style={{textDecoration:'none'}}>
                    <div>
                        <h2 style={{color:'#FAF7F0'}}>register</h2>
                    </div>
                </Link>
                <Link to={"/register"} style={{textDecoration:'none'}}>
                    <div>
                        <img src="./header/cart-shopping-svgrepo-com (1).svg" alt="img" style={{width:'22px', height:'22px'}}/>
                    </div>
                </Link>
                <Link to={""} style={{textDecoration:'none'}}>
                    <div>
                        <h2 style={{color:'#FAF7F0'}}>Profile</h2>
                    </div>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Header
