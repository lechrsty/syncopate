import { Outlet, Route, Routes } from "react-router-dom"
import { ReviewList } from "../components/reviews/ReviewList"
import { ReviewDetails } from "../components/reviews/ReviewDetails"
import { EditReview } from "../components/reviews/EditReview"
import { CreateReview } from "../components/reviews/CreateReview"
import { LoggedInProfile } from "../components/profiles/LoggedInProfile"
import { MemberProfile } from "../components/profiles/MemberProfile"
import { CommentListContainer } from "../components/comments/CommentContainer"
import { MemberDashboard } from "../components/dashboards/MemberDashboard"
import { ClassicsAlbumList } from "../components/albums/ClassicsAlbumList"
import { EssentialsAlbumList } from "../components/albums/EssentialsAlbumList"
import { WorldAlbumList } from "../components/albums/WorldAlbumList"
import { HipHopAlbumList } from "../components/albums/HipHopAlbumList"
import { HighVoltageAlbumList } from "../components/albums/HighVoltageAlbumList"
import { NewReleasesAlbumList } from "../components/albums/NewReleasesAlbumList"
import { AlbumDetails } from "../components/albums/AlbumDetails"



export const MemberViews = () => {

	return (
        <Routes>
            <Route path="/" element={
                <>
                    <Outlet />
                </>
            }>

            <Route path="/home">
                <Route index element={ <MemberDashboard /> } />
            </Route>

            <Route path="/1" element={<ClassicsAlbumList />} />
            <Route path="/2" element={<EssentialsAlbumList />} />
            <Route path="/3" element={<WorldAlbumList />} />
            <Route path="/4" element={<HipHopAlbumList />} />
            <Route path="/5" element={<HighVoltageAlbumList />} />
            <Route path="/6" element={<NewReleasesAlbumList />} />

            <Route path="/reviews">
                <Route index element={ <ReviewList /> } />
                <Route path=":reviewId" element={<ReviewDetails />} />
                <Route path="edit/:reviewId" element={<EditReview />} />
                <Route path="create" element={<CreateReview />} />
                <Route path=":reviewId/comments" element={< CommentListContainer />} />
            </Route>

            <Route path="/profile">
                <Route index element={ <LoggedInProfile /> } />
                <Route path="member/:memberId" element={<MemberProfile />} />
            </Route>

            <Route path="/albums/:albumId" element={<AlbumDetails />} />

            </Route>
        </Routes>
    )
}