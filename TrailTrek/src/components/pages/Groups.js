import React from "react";
import './Groups.css';

const Groups = () => {
    return (
        <main>
        <section className="group-list">
          <h2>Join a Group</h2>
          <div className="group">
            <h3>AT Hiking Group</h3>
            <p>Description:The appalacian hiking group</p>
            <button>Join Group</button>
          </div>


          <div className="group">
            <h3>Runners United</h3>
            <p>Description: Calling all runners! Join us for regular group runs and training sessions.</p>
            <button>Join Group</button>
          </div>
          {}
        </section>
        <section className="group-feed">
          <h2>Group Feed</h2>
          <div className="post">
            <h3>Hiking Enthusiasts</h3>
            <p>Just completed a hike up in Vermont mountains! Here are some breathtaking views we captured along the way. #nature #cool</p>
            <img src="../images/zion_park.jpg" alt="Hiking Adventure" />
          </div>
          <div className="post">
            <h3>Runners United</h3>
            <p>Great run today, everyone! We smashed our PR. Keep up the good work!</p>
          </div>
          {}
        </section>
      </main>
    );
};

export default Groups;