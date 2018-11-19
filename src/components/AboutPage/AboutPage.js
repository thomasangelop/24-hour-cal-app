import React from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div>
    <div>
      <h3>What is 24 Hour Cal?</h3>
      <p>
        Imagine this: 
        60 seconds. 60 minutes. 24 hours. All measurements of time that occur in one day. 
        Everyone is busy and needs to have their time planned out efficiently and effectively. 
        This application will help people easily plan out events with preset preferences.
      </p>
      <p>
        TLDR: A calendar app that helps people easily create event with saved preferences.
      </p>
    </div>
  </div>
);

export default AboutPage;
