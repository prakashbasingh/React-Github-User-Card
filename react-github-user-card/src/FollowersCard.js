import React, {component} from "react";
import styled from 'styled-components'

const FollowerCard = styled.div`
    border: 2px solid black;
    
`



class FollowersCard extends React.Component {
    render(props){
        return(
            <FollowerCard> 
                       
                <button onClick={this.props.toggleFollowers}>Show Followers</button>
            
                {this.props.display && this.props.followers.map((follower) =>(
                    <div className="followers" key={follower.id}>
                        <h2>Followers</h2>
                        <img src={follower.avatar_url} alt='user picture'/>
                        <p>Username: {follower.login}</p>
                    </div>
                ))}
            </FollowerCard>

        )
    }
}
export default FollowersCard