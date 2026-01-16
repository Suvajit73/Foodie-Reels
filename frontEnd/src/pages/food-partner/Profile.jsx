import React, { useEffect, useState } from 'react'
import '../../styles/profile.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {
    const { id } = useParams()
    const [profile, setProfile] = useState(null)
    const [videos, setVideos] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3000/api/food-partner/${id}`, { withCredentials: true })
            .then(response => {
                setProfile(response.data.foodPartner);
                setVideos(response.data.foodPartner.foodItems);
            })
    }, [id])

    return (
        <main className="profile-page">
            <section className="profile-header">
                <div className="profile-meta">
                    {/* Avatar */}

                    <img className="profile-avatar" src="https://media.istockphoto.com/id/1317804578/photo/one-businesswoman-headshot-smiling-at-the-camera.webp?a=1&b=1&s=612x612&w=0&k=20&c=0ez7MLSYsOlKDghpVAUDMVf_gT5B_DfKmRNKqElOLUA=" alt="" />





                    {/* Info */}
                    <div className="profile-info">
                        <h1 className="profile-pill profile-business"
                            title='Business name'>
                            {profile?.name}
                        </h1>
                        <p className="profile-pill profile-address"
                            title='Address'>
                            {profile?.address}
                        </p>
                    </div>
                </div>

                {/* Stats */}
                <div className="profile-stats" role="list" aria-label='Stats'>
                    <div className="profile-stat" role="listitem">
                        <span className="profile-stat-label">total meals</span>
                        <span className="profile-stat-value">{profile?.totalMeals}</span>
                    </div>

                    <div className="profile-stat" role="listitem">
                        <span className="profile-stat-label">customer served</span>
                        <span className="profile-stat-value">{profile?.customersServed}</span>

                    </div>
                </div>
            </section>

            <hr className="profile-sep" />

            {/* Video Grid */}
            <section className="profile-grid" aria-label="Videos">
                {videos.map((v) => (
                    <div key={v.id} className="profile-grid-item">

                        <video
                            className="profile-grid-video"
                            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                            src={v.video} muted></video>

                    </div>
                ))}
            </section>

        </main>
    )
}

export default Profile
