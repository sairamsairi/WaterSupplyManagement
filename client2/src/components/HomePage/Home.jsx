import "./Home.css";
import taps from "./log-photo.jpg";
import tap from "./tap2.jpg";
function home() {
  return (
    <div className="body">
      <header>
        <img src={taps} alt="jal" />
        <div class="head">
          <h1>KMSWD</h1>
        </div>
      </header>

      <div>
        <section>
          <h2>Welcome to KMSWD Website!</h2>
        </section>

        <div className="sec">
          <div className="text">
            <h3>What is the water supply network</h3>
            <div className="intro">
              <p>
                The water supply system is a network of structures, processes,
                and resources that ensures the provision of clean and safe water
                to communities. It involves the extraction, treatment, and
                distribution of water for various purposes, including domestic
                use, industrial processes, and agriculture. A water supply
                network or water supply system is a system of engineered
                hydrologic and hydraulic components that provide water supply. A
                water supply system typically includes the following: A drainage
                basin (see water purification - sources of drinking water)
              </p>
              <p>
                Water supply systems are networks whose edges and nodes are
                pressure pipes and either pipe junctions, water sources or
                end-users, respectively. Their function is to provide end-users
                with potable water with a sufficient pressure level.
              </p>
              <p>
                The water supply network extends to individual households
                through a system of pipes branching off the main distribution
                lines. Each household is connected to this network through a
                water meter and a service line.
              </p>
            </div>
          </div>
          <div className="tap">
            <img src={tap} alt="tap" />
          </div>
        </div>
        <div className="supply">
          <img
            src="https://as1.ftcdn.net/v2/jpg/04/44/37/92/1000_F_444379286_Hl27teoFxp7AWv7iRkzcfM62qrtUSS6C.jpg"
            alt="household"
          />
        </div>
        <div className="empty">
          <div className="about">
            <h5>About our website 👉</h5>
          </div>
          <marquee behavior="smooth" direction="left">
            Keshav Memorial Water Supply Distribution (KMSWD)
          </marquee>
        </div>
        <div className="sec">
          <div className="text">
            <h3>Water supply to households</h3>
            <p>
              Mapping the water supply network to households involves creating a
              comprehensive plan and visual representation of how water is
              sourced, treated, and distributed to individual homes within a
              specific area. Here's an understanding of the process:
            </p>

            <div className="cont">
              <h4>Identification of Water Sources:</h4>
              <div className="para">
                <p>
                  The first step is to identify the various sources of water,
                  which could include rivers, lakes, reservoirs, groundwater, or
                  water treatment plants. These sources act as the starting
                  point for the water supply network. Water from natural sources
                  often requires treatment to make it safe for consumption.
                  Treatment plants remove impurities, contaminants, and ensure
                  that the water meets regulatory standards for drinking. This
                  treated water becomes a crucial part of the supply network.
                  Once treated, the water is transported through a network of
                  pipes, pumps, and valves. This network is designed to
                  efficiently transport water from the source to residential
                  areas. Engineers plan the layout of these pipelines to ensure
                  a reliable and consistent supply.
                </p>
                <div className="img1">
                  <img src="https://img.freepik.com/premium-vector/folded-location-map-with-marker-city-map-with-pin-pointer_349999-746.jpg?size=626&ext=jpg&ga=GA1.1.397762671.1703252081&semt=sph"  
                   alt="point1"/>
                  <img src="https://img.freepik.com/premium-vector/gps-navigator-pin-checking-point-point-b-street-map-with-distance-pointer_99087-9.jpg?size=626&ext=jpg&ga=GA1.1.397762671.1703252081&semt=sph" 
               alt="point2"/>
                </div>
              </div>
                  
              <h4>Connection to Household:</h4>
              <div className="para">
                <div className="img2">
                  <img
                    src="https://media.istockphoto.com/id/1181555776/vector/pipe-background_2.jpg?s=612x612&w=0&k=20&c=4sBhQ2AaE2gbXgE7C76GyV5MiGAr_tn88gigezSZds4="
                    alt=""
                  />
                </div>
                <p style={{width: "60%"}}>
                  The water supply network extends to individual households
                  through a system of pipes branching off the main distribution
                  lines. Each household is connected to this network through a
                  water meter and a service  Water Meters: Water meters are
                  installed at each household to measure the amount of water
                  consumed. This data is crucial for billing purposes and helps
                  in monitoring and managing water usage.Pressure Regulation:
                  The network is designed to maintain adequate water pressure
                  throughout the distribution system. Pressure-regulating valves
                  are strategically placed to ensure that water reaches all
                  households with sufficient force.
                </p>
              </div>
              <h4>Emergency Response:</h4>
              <p>
                The mapping also considers emergency situations. Valves and
                shut-off points are strategically placed to isolate sections of
                the network in case of leaks, repairs, or other emergencies.
                Technology Integration: Modern systems often integrate
                technology for real-time monitoring and control. Sensors and
                automation tools help in identifying leaks, optimizing pressure,
                and ensuring the overall efficiency of the network. Community
                Awareness: The entire water supply network must comply with
                local and national regulations. This includes water quality
                standards, environmental regulations, and health and safety
                requirements. Mapping the water supply network to households is
                a complex but essential process to ensure a reliable and safe
                water supply to communities. It involves the collaboration of
                engineers, planners, and community members to design a system
                that meets the needs of both today and the future.
              </p>
            </div>
            <div className="urban">
              <img
                src="https://media.istockphoto.com/id/1187132242/vector/pipeline-concept-flat-design-background-on-yellow-vector.jpg?s=612x612&w=0&k=20&c=hSdWayaGox3SgjqCZu0YCvN81R5eEwYlPWo_jXzf8j4="
                alt=""
              />
              <img
                src="https://media.istockphoto.com/id/1285073888/vector/handymen-working-in-team-and-fixing-leakage-in-boiler-room.jpg?s=612x612&w=0&k=20&c=u-sJbzHoO-6RbdtZ1knFYfC1etbXBIvKUeKzcqjelhA="
                alt=""
              />
              <img
                src="https://media.istockphoto.com/id/1357893999/photo/stationary-engineer-at-work.jpg?s=612x612&w=0&k=20&c=1tFq8ezaoZdx4kmx4JqjOXeufHI24rGaARGQthGwcvo="
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="flx">
          <div className="contact-info">
            <h4>Services</h4>
            <p>Contact: +123 745 632</p>
            <p>Email: KMSWD@gmail.com</p>
            <p>
              Address: Keshav Memorial Institute Of Technology, Hyderabad,
              Telangana
            </p>
          </div>
          <div className="social-icons">
            <h4 className="media_head">Social media</h4>
            <ul className="footer-icons">
              <li>
                <a href="#" target="_blank">
                  <img
                    src="https://www.thehindu.com/theme/images/th-online/footer-icon-fb.svg"
                    alt="facebook"
                  />
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <img
                    src="https://www.thehindu.com/theme/images/th-online/footer-icon-youtube.svg"
                    alt="youtube"
                  />
                </a>
              </li>
              <li>
                <a href="#" target="_blank">
                  <img
                    src="https://www.thehindu.com/theme/images/th-online/footer-icon-linkedin.svg"
                    alt="linkedin"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="cop">
          <p>&copy; 2023 KMWSD All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default home;