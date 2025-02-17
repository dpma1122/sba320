
import React, { useState, useEffect } from 'react';
 
const Cuisine = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newCategory, setNewCategory] = useState({ name: '', description: '' });
 
    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list");
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                const data = await response.json();
                setCategories(data.meals);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setError(error.message);
                setLoading(false);
            }
        }
 
        fetchCategories();
    }, []);
 
    if (loading) {
        return <div>Loading...</div>;
    }
 
    if (error) {
        return <div>Error: {error}</div>;
    }
 
    return (
        <div className="cuisine-container">
            <h1>Cuisine Categories</h1>
            <ul className="category-list">
                {categories.map((category) => (
                    <li key={category.strCategory} className="category-item">
                        {category.strCategory}
                    </li>
                ))}
            </ul>
        </div>
    );
};
 
export default Cuisine;