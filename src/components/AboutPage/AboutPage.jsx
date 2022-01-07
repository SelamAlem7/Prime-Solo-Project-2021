import React from 'react';
import './AboutPage.css';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <p>The more support for your loved ones, the merrier!</p>
        <p>We understand the importance of caring for those you love. With our person centered app, our mission is to empower the communication between
          those involved in caring for an individual in need. With a shared account in mind, 
          all your needs to meet theirs is in one place.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
