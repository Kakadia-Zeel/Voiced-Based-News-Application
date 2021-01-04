import React,{useState, useEffect} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles.js';
import wordsToNumbers from 'words-to-numbers';
import logo from './logo.jpg';

const alanKey='3cb3dda5b952849f8f4ef7d9310c85052e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {
    const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle,setActiveArticle]=useState(-1);
    const classes = useStyles();
    useEffect(() => {
        alanBtn({
            key : alanKey,
            onCommand: ({ command,articles,number }) => {
                if(command ==='newHeadlines'){
                    setNewsArticles(articles)
                    setActiveArticle(-1);
                }
                else if(command==='highlight'){
                    setActiveArticle((prevActiveArrticle)=>prevActiveArrticle+1);
                }
                else if(command==='open'){
                    const parsedNumbers = number.length > 2 ? wordsToNumbers(number,{fuzzy : true}) :  number;

                    const article = articles[parsedNumbers-1];
                    if(parsedNumbers>20){
                        alanBtn().playText('Please Try that Again')
                    }
                    else if(article){
                            window.open(article.url,'_blank');
                            alanBtn().playText('Opening');

                    }
                }
            }
        })
    },[])


    return(
        <div>
            <div className={classes.prjTitle}><h1>Voice Based News Application</h1> </div>
            <div className={classes.logoContainer}>
                <img src = {logo} className={classes.alanLogo} alt ="logo" />
            </div>
            <NewsCards articles ={newsArticles} activeArticle={activeArticle}/>
        </div>
    )
}

export default App;