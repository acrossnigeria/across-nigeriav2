const VidDownloadButton = ({ videoUrl, fileName }) => {
    const handleDownload = () => {
      // Create an anchor element
      const link = document.createElement('a');
      link.href = videoUrl;
      link.download = fileName || 'video.mp4'; // Set the default file name
      document.body.appendChild(link);
      link.click(); // Trigger the download
      document.body.removeChild(link); // Clean up
    };

    return (
      <button onClick={handleDownload} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Download Video
      </button>
    );
  };

export default VidDownloadButton;