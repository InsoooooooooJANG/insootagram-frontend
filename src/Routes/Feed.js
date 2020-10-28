import  React  from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import "../Components/Loader";
import Loader from '../Components/Loader';
import styled  from 'styled-components';

const FEED_QUERY=gql`
{
    seeFeed{
        id
        location
        caption
        user{
            id
            avatar
            username
        }
        files{
            id
            url
        }
        likeCount
        isLiked
        comments{
            id
            text
            user{
                id
                username
            }
        }
        createdAt
    }
}
`;

const Wrapper = styled.div`
    display:flex;
    flex-direction : column;
    align-items:center;
    min-height: 80vh;
`;

export default()=>{
    const {data,loading}  = useQuery(FEED_QUERY);
    return (
        <Wrapper>
            {loading && <Loader/>}
        </Wrapper>
    );
    
}