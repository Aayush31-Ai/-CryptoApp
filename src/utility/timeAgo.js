export   function timeAgo(unixTime) {
    const now = Date.now(); // milliseconds
    const published = unixTime * 1000; // convert sec -> ms
    const diff = Math.floor((now - published) / 1000); // diff in sec

    if (diff < 60) return `${diff} sec ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  }