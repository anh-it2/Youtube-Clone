import React, { useEffect, useState } from 'react'
import './PlayVideo.css'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import { API_KEY } from '../../data'
import { value_converter } from '../../data'
import moment from 'moment'

const PlayVideo = ({videoId}) => {

    const [apiData, setApiData] = useState(null);

    const fetVideoData = async () =>{
         const videoDetails_url = `https://content-youtube.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet%2CcontentDetails%2Cstatistics&key=${API_KEY}`
         await fetch(videoDetails_url).then(res=>res.json()).then(data => setApiData(data.items[0]))
    }

    useEffect((() =>{
        fetVideoData();
    }),[videoId])

    const [channelData, setChannelData] = useState(null)
    const [commentData, setCommentData] = useState([])
    const fetchChannelData = async ()=>{
            const channelDetail_url = `https://content-youtube.googleapis.com/youtube/v3/channels?id=${apiData.snippet.channelId}&part=snippet%2CcontentDetails%2Cstatistics&key=${API_KEY}`
            await fetch(channelDetail_url).then(res=>res.json()).then(data=>setChannelData(data.items[0]))

        const commentData_url = `https://content-youtube.googleapis.com/youtube/v3/commentThreads?videoId=${videoId}&part=snippet&key=${API_KEY}`
        await fetch(commentData_url).then(res=>res.json()).then(data=>setCommentData(data.items))
        console.log(commentData)
    }

    useEffect((()=>{
        fetchChannelData()
    }),[apiData])
  return (
    <div className='play-video'>
        <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <h3>{apiData? apiData.snippet.title:""}</h3>
        <div className="play-video-info">
            <p>{apiData?value_converter(apiData.statistics.viewCount):''} Views &bull; {apiData?moment(apiData.snippet.publishedAt).fromNow():''}</p>
        <div>
            <span><img src={like} alt="" />{apiData?value_converter(apiData.statistics.likeCount):123}</span>
            <span><img src={dislike} alt=''/></span>
            <span><img src={share} alt=''/>Share</span>
            <span><img src={save} alt=''/></span>
        </div>      
        </div>
        <hr />
        <div className="publisher">
            <img src={channelData?channelData.snippet.thumbnails.default.url:''} alt="" />
            <div>
                <p>{apiData?apiData.snippet.channelTitle:''}</p>
                <span>{channelData?value_converter(channelData.statistics.subscriberCount):0} Subcriber</span>
            </div>
            <button>Subcribe</button>
        </div>
        <div className="vid-description">
            <p>{apiData?apiData.snippet.description.slice(0,250):'Description here'}</p>
            <hr />
            <h4>{apiData?value_converter(apiData.statistics.commentCount):0} Comments</h4>
            {commentData.map((comment)=>{
                return (<>
                <div  className="comment">
                <img src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                <div>
                    <h3> {comment.snippet.topLevelComment.snippet.authorDisplayName} <span></span></h3>
                    <p>{comment.snippet.topLevelComment.snippet.textDisplay}</p>
                    <div className="comment-action">
                        <img src={like} alt="" />
                        <span>{value_converter(comment.snippet.topLevelComment.snippet.likeCount)}</span>
                        <img src={dislike} alt="" />
                    </div>
                </div>
            </div>
                </>)
            })}
        </div>
    </div>
  )
}

export default PlayVideo