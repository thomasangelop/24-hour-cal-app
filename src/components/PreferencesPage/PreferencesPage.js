import React from 'react';
import CreateNewP from './CreateNewP';
import EditP from './EditP';
import DeleteP from './DeleteP';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const PreferencesPage = () => (
  <div>
    <h3>Preferences</h3>
    <p>
    Create or delete a new preference type.
    </p>
    <CreateNewP />
    <ul>
      <li>Work <EditP /><DeleteP /></li>
      <li>Hobby <EditP /><DeleteP /></li>
      <li>Fitness <EditP /><DeleteP /></li>
      <li>Food <EditP /><DeleteP /></li>
      <li>Sleep <EditP /><DeleteP /></li>
    </ul>
  </div>
);

export default PreferencesPage;
