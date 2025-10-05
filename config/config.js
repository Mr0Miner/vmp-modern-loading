// Global configuration for loading screen
// Edit values here to customize without touching HTML/JS logic
window.CONFIG = {
  video: {
    // Local video file path (e.g., mp4/webm). Set to null to disable background video.
    file: "img/movie.webm",
  },
  audio: {
    // List of songs to rotate through
    songs: [
      { src: "song/song1.mp3", title: "Asketa & Natan Chaim - More [NCS Release]" },
      { src: "song/song2.mp3", title: "Akacia - Electric [NCS Release]" },
      { src: "song/song3.mp3", title: "Wiguez & Vizzen - Running Wild [NCS Release]" },
    ],
    defaultVolume: 0.3,
  },
  logo: {
    // Path to logo image and optional width in pixels
    src: "logo/logo.png",
    width: 300,
  },
  user: {
    // If provided, overrides name from handover data
    nameOverride: null, // e.g. "MrMiner"
  },
  staff: [
    // Example entries; edit as needed
    { name: "Arshia 93", role: "Owner", roleClass: "owner-role", avatar: "img/StaffTeam/Arshia93.jpg" },
    { name: "Gt_Gamer", role: "Co-Owner", roleClass: "co-owner-role", avatar: "img/StaffTeam/gt_gamer.png" },
    { name: "Mr_Miner", role: "Developer", roleClass: "developer-role", avatar: "img/StaffTeam/mr_miner.jpg" },
    // { name: "behdad xmaster", role: "Developer", roleClass: "developer-role", avatar: "img/StaffTeam/simple.png" },
    // { name: "---", role: "Manager", roleClass: "manager-role", avatar: "img/StaffTeam/simple.png" },
    // { name: "---", role: "Server Manager", roleClass: "manager-role", avatar: "img/StaffTeam/simple.png" },
    // { name: "---", role: "Admin", roleClass: "admin-role", avatar: "img/StaffTeam/simple.png" },
  ],
};



