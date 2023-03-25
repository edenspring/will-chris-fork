import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import './ManageSpots.css'
import ManageButtons from '../ManageButtons'
import { loadUserSpots } from '../../store/spots';
import SpotCards from '../SpotCards';

const ManageSpots = () => {

  const dispatch = useDispatch(); 
  const spots = useSelector(state=> state.spots.allSpots);
  const allSpots = Object.values(spots);
  
  useEffect(() => {
    dispatch(loadUserSpots())
  }, [dispatch]); 
  

  return (
    <main>
      <div className="manage-wrapper">
        <nav className="spot-cards-section">
          <div className="spot-cards-section-header">
            <h3>Manage Spots</h3>
            <NavLink
              className="spot-card"
              to={`/spots/new`}
            >
              <button
                className="create-button manage"
              >create a new spot</button>
            </NavLink>
          </div>
            {
              allSpots.map(spot => 
                <>
                  <SpotCards spot={spot}/>
                  <ManageButtons spot={spot}/>
                </>
              )
            }
        </nav>
      </div>
    </main>
  );
};

export default ManageSpots;