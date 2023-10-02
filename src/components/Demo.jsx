import { useState, useEffect} from 'react'
import { copy, linkIcon, loader, tick } from '../assets'
import { BiSubdirectoryLeft } from 'react-icons/bi';
import { useLazyGetSummaryQuery } from '../services/article'

const Demo = () => {
    const [article, setArticle] = useState({
        url: '',
        summary: ''
    });
    const [copied, setCopied] = useState('')

    useEffect(() =>{
        const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'))

        if (articlesFromLocalStorage) {
            setAllArticles(articlesFromLocalStorage)
        }
    }, []);

    const [allArticles, setAllArticles] = useState([]);

    const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await getSummary({ articleUrl: article.url});

        if(data?.summary) {
            const newArticle = { ...article, summary: data.summary };
            const updatedAllArticles = [newArticle, ... allArticles];

            setArticle(newArticle)
            setAllArticles(updatedAllArticles);

            localStorage.setItem('articles', JSON.stringify(updatedAllArticles))
        }
    }

    const handleCopy = (copyUrl) => {
        setCopied(copyUrl);
        navigator.clipboard.writeText(copyUrl);
        setTimeout(() => setCopied(false), 2000)
    }
  return (
    <main className='mt-16 w-full max-w-xl'>
        <div className="flex flex-col w-full gap-2">
            <form 
                className="relative flex justify-center items-center"
                onSubmit={handleSubmit}
            >
                <img src={linkIcon} alt="link icon"
                    className='absolute left-0 my-2 ml-3 w-5'
                />
                <input
                     type="url"
                     placeholder='Enter a Url'
                     value={article.url}
                     onChange={(e) => setArticle({
                        ...article, url: e.target.value
                     })}
                     required
                     className='url_input peer'
                />
                <button
                type='submit'
                className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700'>
                    <BiSubdirectoryLeft
                        className='text-gray-700'
                        size={25}
                    />
                </button>
            </form>
            {/* show browser url history */}
            <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
                {allArticles.map(( items, index ) => (
                    <div
                        key={`link-${index}`}
                        onClick={() => setArticle(items)}
                        className='link_card'
                    >
                        <div className="copy_btn" onClick={() => handleCopy(items.url)}>
                            <img 
                                src={copied === items.url ? tick : copy} 
                                alt="copy icon"
                                className='w-[40%] h-[40%] object-contain'
                            />
                        </div>
                        <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>{items.url}</p>
                    </div>
                ))}
            </div>
        </div>
        <div className="my-10 max-w-full flex justify-center items-center">
            {isFetching ? (
                <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
            ) : error ? (
                <p className="font-inter font-bold text-black text-center">Something went wrong...
                    <br />
                    <span className="font-satoshi font-normal text-gray-700">
                        {error?.data?.error}
                    </span>
                </p>              
            ) : (
                article.summary && (
                    <div className="flex flex-col gap-3">
                        <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                            Article 
                            <span className='blue_gradient ml-2'>Summary</span>
                        </h2>
                        <div className="summary_box">
                            <p className='font-inter font-medium text-sm text-gray-700'>{article.summary}</p>
                        </div>
                    </div>
                )
            )}
        </div>
    </main>
  )
}

export default Demo