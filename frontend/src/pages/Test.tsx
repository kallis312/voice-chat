// import Jitsi from 'react-jitsi'
import JitsiMeeting from '@jitsi/react-sdk'

// const roomName = 'my-super-secret-meeting-123e4567-e89b-12d3-a456-426655440000'
// const userFullName = 'Joseph Strawberry'

const App = () => {
  return (
    <>
      <h2>My First Meeting!</h2>
      <JitsiMeeting
        domain={'localhost'}
        roomName="PleaseUseAGoodRoomName"
        configOverwrite={{
          startWithAudioMuted: true,
          disableModeratorIndicator: true,
          startScreenSharing: true,
          enableEmailInStats: false
        }}
        interfaceConfigOverwrite={{
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: true
        }}
        userInfo={{
          displayName: 'YOUR_USERNAME'
        }}
        onApiReady={(externalApi) => {
          // here you can attach custom event listeners to the Jitsi Meet External API
          // you can also store it locally to execute commands
        }}
      />
    </>
  )
}

export default App