import { Button, HStack } from '@chakra-ui/react';
import { ArrowRightEndOnRectangleIcon, ChatBubbleBottomCenterIcon, ChatBubbleBottomCenterTextIcon, MicrophoneIcon, MusicalNoteIcon, PaperClipIcon, SignalSlashIcon, SwatchIcon, TvIcon, VideoCameraIcon, VideoCameraSlashIcon } from '@heroicons/react/24/solid';
import React, { useCallback } from 'react';
import styled from 'styled-components';

interface Props {

}

const BottomBar = ({
  clickChat,
  clickCameraDevice,
  goToBack,
  toggleCameraAudio,
  userVideoAudio,
  clickScreenSharing,
  screenShare,
  videoDevices,
  showVideoDevices,
  setShowVideoDevices
}) => {
  const handleToggle = useCallback(
    (e) => {
      setShowVideoDevices((state) => !state);
    },
    [setShowVideoDevices]
  );

  return (
    <HStack justify={'space-between'} w={'full'} px={4} borderTopWidth={1} py={2} bg={'gray.200'} >
      <HStack>
        <Button colorScheme={'teal'} variant={'outline'} onClick={toggleCameraAudio} data-switch='video' leftIcon={
          userVideoAudio.video ? (
            <VideoCameraIcon width={24} />
          ) : (
            <VideoCameraSlashIcon width={24} />
          )
        }>
          Camera
        </Button>
        {showVideoDevices && (
          <HStack>
            {videoDevices.length > 0 &&
              videoDevices.map((device) => {
                return <div key={device.deviceId} onClick={clickCameraDevice} data-value={device.deviceId} >{device.label}</div>;
              })}
            <div>Switch Camera</div>
          </HStack>
        )}
        <Button colorScheme={'teal'} variant={'outline'} onClick={handleToggle} leftIcon={<SwatchIcon width={24} />}>
        </Button>
        <Button colorScheme={'teal'} variant={'outline'} onClick={toggleCameraAudio} data-switch='audio' leftIcon={userVideoAudio.audio ? (
          <MicrophoneIcon width={24} />
        ) : (
          <SignalSlashIcon width={24} />
        )}>

          Audio
        </Button>
      </HStack>
      <HStack>
        <Button colorScheme={'teal'} variant={'outline'} onClick={clickChat} leftIcon={<ChatBubbleBottomCenterIcon width={24} />}>
          Chat
        </Button>
        <Button colorScheme={'teal'} variant={'outline'} onClick={clickScreenSharing} leftIcon={<TvIcon width={24} />}>
          Share Screen
        </Button>
      </HStack>
      <Button colorScheme={'teal'} variant={'outline'} leftIcon={<ArrowRightEndOnRectangleIcon width={24} />} onClick={goToBack}>Exit</Button>
    </HStack>
  );
};

export default BottomBar;