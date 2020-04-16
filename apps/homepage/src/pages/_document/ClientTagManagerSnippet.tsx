import React from 'react';

interface ClientTagManagerSnippetProps {
  clientTagManagerSrcUrl?: string;
}

const ClientTagManagerSnippet: React.FC<ClientTagManagerSnippetProps> = ({
  clientTagManagerSrcUrl,
}) => {
  if (clientTagManagerSrcUrl && clientTagManagerSrcUrl !== '') {
    return <script src={clientTagManagerSrcUrl} async />;
  }
  return null;
};

export default ClientTagManagerSnippet;
