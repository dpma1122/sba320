export default function Cuisine() {
   
    
    //this should show a random meal when the page renders
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newCategory, setNewCategory] = useState({ name: '', description: '' });


    useEffect(() => {
        fecthCategories()
    }, [])
};

    // return (
    //     <h1>Embark on your Flavorful Journey</h1>
    // )
};