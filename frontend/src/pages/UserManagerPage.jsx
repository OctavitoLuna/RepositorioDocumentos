import React from 'react';
import UserManager from '../components/UserManager';

export default function UserManagerPage() {
  return (
    <div>
    <h1 style={{ marginTop: '22vh', backgroundColor: '#1A0809', color: 'white', padding: '10px' }}>
      Administración de Usuarios
    </h1>
      <UserManager />
    </div>
  );
}
