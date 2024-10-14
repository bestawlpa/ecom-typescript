import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Product {
    id: number
    product_name : string
}

const Header = () => {
    const [search, setSearch] = useState<string>("")
    const [openSearch, setOpenSearch] = useState<boolean>(false);
    const [searchOpen, setSearchOpen] = useState<boolean>(false);
    const [product, setProduct] = useState<Product[]>([]);
    const [filteredProduct, setFilteredProduct] = useState<Product[]>([]);

    const handleOpenSearch = () => {
        setOpenSearch(!openSearch);
        setSearchOpen(!searchOpen)
        setSearch("")   
    };

    const handleSearchOpen = () => {
        setOpenSearch(!openSearch);
        setSearchOpen(!searchOpen)
        setSearch("")
    }

    const getProduct = async () => {
        try {
            const response = await fetch('http://localhost:3030/api/products');
            if (!response.ok) {
                throw new Error('Product not found');
            }
            const data: Product[] = await response.json();

            const randomProducts = data.sort(() => 0.5 - Math.random()).slice(0, 4);
            setProduct(randomProducts);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (search === "") {
            setFilteredProduct(product);
        } else {
            const filtered = product.filter((e) =>
                e.product_name.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredProduct(filtered);
        }
    }, [search, product]); 
    
    useEffect(() => {
        getProduct();
    },[])

    return (
        <div style={{ width: '100%', height: '100px', background: '#1A4D2E', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ width: '1200px', height: '80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ width: '280px' }}>
                    <Link to={'/'} style={{ textDecoration: 'none' }}>
                        <h1 style={{ color: '#FAF7F0' }}>NightMarket</h1>
                    </Link>
                </div>

                <div style={{ position: 'relative' }}>
                    <div style={{ height: '30px', width: '300px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFFFF', borderRadius: '8px', overflow: 'hidden', position:'relative', zIndex:'10' }}>
                        <input
                            onClick={handleOpenSearch}
                            type="text"
                            placeholder='search'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{ width: '250px', outline: 'none', border: 'none', borderRadius: '8px', height: '26px', padding: '0 6px' }}
                        />
                        <button style={{ background: '#FFFFFF', border: 'none', borderLeft: '2px solid #000000', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img src="./header/search-svgrepo-com (2).svg" alt="img" style={{ width: '22px', height: '22px' }} />
                        </button>
                    </div>
                    {openSearch && (
                        <div style={{ position: 'absolute', top: '32px', right: '-30px', width: '350px', height: '200px', background: '#FFFFFF', borderRadius: '8px', zIndex:'10', padding:'4px'}}>
                            {filteredProduct.map((e) => (
                                <div key={e.id}>
                                    <Link to={''} style={{ textDecoration: 'none' }}>
                                        {e.product_name}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                    {searchOpen && (
                        <div onClick={handleSearchOpen} style={{position:'fixed', background:'black', zIndex:'0', inset:'0', opacity:'0.5'}}></div>
                    )}
                </div>

                

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '280px' }}>
                    <Link to={"/register"} style={{ textDecoration: 'none' }}>
                        <div>
                            <h2 style={{ color: '#FAF7F0' }}>register</h2>
                        </div>
                    </Link>
                    <Link to={"/register"} style={{ textDecoration: 'none' }}>
                        <div>
                            <img src="./header/cart-shopping-svgrepo-com (1).svg" alt="img" style={{ width: '22px', height: '22px' }} />
                        </div>
                    </Link>
                    <Link to={""} style={{ textDecoration: 'none' }}>
                        <div>
                            <h2 style={{ color: '#FAF7F0' }}>Profile</h2>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Header;
