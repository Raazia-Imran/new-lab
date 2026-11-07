<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Multiscale Modelling & Simulation Lab - NEDUET</title>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/styles.css" rel="stylesheet">
</head>
    

    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <div class="container">
            <a class="navbar-brand" href="#home">Multiscale Modelling & Simulation Lab</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="#home">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="#about">About</a></li>
                    <li class="nav-item"><a class="nav-link" href="#achievements">Achievements</a></li>
                    <li class="nav-item"><a class="nav-link" href="#clients">Clients</a></li>
                    <li class="nav-item"><a class="nav-link" href="#projects">Projects</a></li>
                    <li class="nav-item"><a class="nav-link" href="#papers">Papers</a></li>
                    <li class="nav-item"><a class="nav-link" href="#resources">Resources</a></li>
                    <li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Home / Hero Section -->
<section id="home" class="hero text-center d-flex align-items-center justify-content-center" style="background-image: url('images/hero-bg.png'); background-size: cover; background-position: center; min-height: 80vh; position: relative;">
    <!-- Dark overlay for better contrast + White shaded text background -->
    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.4);"></div>
    
    <div class="container position-relative">
        <div class="bg-white bg-opacity-75 rounded-3 shadow-lg p-5 mx-auto" style="max-width: 900px;">
            <h1 class="display-4 fw-bold text-dark mb-3">Multiscale Modelling & Simulation Lab</h1>
            <h4 class="text-dark mb-4">NED University of Engineering and Technology</h4>
            <p class="lead text-dark fs-5">We focus on advanced multiscale modeling and simulation techniques for solving complex engineering and scientific problems.</p>
        </div>
    </div>
</section>

    <!-- About Section -->
    <section id="about" class="py-5">
        <div class="container">
            <h2 class="section-title text-center mb-4">About Us</h2>
            <div class="row">
                <div class="col-md-6">
                    <p>Our lab specializes in multiscale simulations that bridge atomic, microscopic, and macroscopic scales to understand material behavior, fluid dynamics, and structural mechanics.</p>
                </div>
                <div class="col-md-6">
                    <p>We collaborate with industry and academia to develop innovative computational tools and apply them to real-world challenges.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Achievements Section -->
    <section id="achievements" class="py-5 bg-light">
        <div class="container">
            <h2 class="section-title text-center mb-4">Achievements</h2>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Awarded Best Research Lab in Mechanical Engineering (2024)</li>
                <li class="list-group-item">Published over 50 papers in high-impact journals</li>
                <li class="list-group-item">Secured multiple national and international research grants</li>
                <li class="list-group-item">Developed open-source multiscale simulation tools</li>
                <!-- Add more as needed -->
            </ul>
        </div>
    </section>

<!-- Clients & Partners Section -->
<section id="clients" class="py-5 bg-light">
    <div class="container">
        <h2 class="section-title text-center mb-5">Clients & Partners</h2>
        <p class="text-center mb-4 text-muted">Our Recent Valuable Clients</p>
        
        <div id="clientsCarousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
            <div class="carousel-inner">
                <!-- Slide 1 -->
                <div class="carousel-item active">
                    <div class="row align-items-center justify-content-center g-4">
                        <div class="col-6 col-md-3 text-center">
                            <img src="images/clients/1.png" alt="Meekat International (Ansys Partner)" class="img-fluid client-logo">
                        </div>
                        <div class="col-6 col-md-3 text-center">
                            <img src="images/clients/2.png" alt="Simulation Software Leaders" class="img-fluid client-logo">
                        </div>
                        <div class="col-6 col-md-3 text-center">
                            <img src="images/clients/3.png" alt="Simulation Ecosystem" class="img-fluid client-logo">
                        </div>
                    </div>
                </div>
                
                <!-- Slide 2 -->
                <div class="carousel-item">
                    <div class="row align-items-center justify-content-center g-4">
                        <div class="col-6 col-md-3 text-center">
                            <img src="images/clients/4.png" alt="Pakistani Industry Leaders" class="img-fluid client-logo">
                        </div>
                        <div class="col-6 col-md-3 text-center">
                            <img src="images/clients/5.png" alt="Pakistani Industry Leaders" class="img-fluid client-logo">
                        </div>
                        <div class="col-6 col-md-3 text-center">
                            <img src="images/clients/6.png" alt="Pakistani Industry Leaders" class="img-fluid client-logo">
                        </div>
                    </div>
                </div>
                
                <!-- Add more slides if you have more logos -->
            </div>
            
            <!-- Optional: Carousel controls -->
            <button class="carousel-control-prev" type="button" data-bs-target="#clientsCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#clientsCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
</section>

    <!-- Projects Section -->
    <section id="projects" class="py-5 bg-light">
        <div class="container">
            <h2 class="section-title text-center mb-4">Projects</h2>
            <div class="row">
                <div class="col-md-4 mb-4">
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title">Nano-Channel Flow Analysis</h5>
                            <p class="card-text">Multiscale modeling of fluid dynamics in nano-channels using molecular dynamics and continuum methods.</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title">Composite Material Reinforcement</h5>
                            <p class="card-text">Studying the strengthening mechanisms in fiber-reinforced composites at multiple scales.</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 mb-4">
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title">Phase Transformation in Steels</h5>
                            <p class="card-text">Predicting microstructure evolution during heat treatment using phase-field and CALPHAD approaches.</p>
                        </div>
                    </div>
                </div>
                <!-- Add more project cards -->
            </div>
        </div>
    </section>

    <!-- Research Papers Section -->
    <section id="papers" class="py-5">
        <div class="container">
            <h2 class="section-title text-center mb-4">Research Papers</h2>
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Authors</th>
                            <th>Year</th>
                            <th>Journal</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Multiscale Modeling of Transformation in Steels</td>
                            <td>Rashid Khan et al.</td>
                            <td>2023</td>
                            <td>Journal of Materials Science</td>
                        </tr>
                        <tr>
                            <td>Insights from Multiscale Modeling of Construction Materials</td>
                            <td>Dr. Tariq Jamil et al.</td>
                            <td>2022</td>
                            <td>Construction and Building Materials</td>
                        </tr>
                        <!-- Add more rows -->
                    </tbody>
                </table>
            </div>
        </div>
    </section>

    <!-- Resources Section -->
    <section id="resources" class="py-5 bg-light">
        <div class="container">
            <h2 class="section-title text-center mb-4">Resources</h2>
            <ul class="list-group list-group-flush">
                <li class="list-group-item"><a href="#">Simulation Software Guide (PDF)</a></li>
                <li class="list-group-item"><a href="#">Lab Equipment List</a></li>
                <li class="list-group-item"><a href="#">Multiscale Modeling Tutorials</a></li>
                <li class="list-group-item"><a href="#">Open-Source Codes on GitHub</a></li>
            </ul>
        </div>
    </section>

    <!-- Contact Section -->
<!-- Contact Section -->
<section id="contact" class="py-5 bg-light">
    <div class="container">
        <h2 class="section-title text-center mb-5">Contact Us</h2>
        <div class="row align-items-center">
            <!-- Left Side: Lab Logo -->
            <div class="col-lg-5 text-center mb-4 mb-lg-0">
                <img src="images/logo.png" alt="Multiscale Modelling & Simulation Lab Logo" class="img-fluid shadow" style="max-height: 350px; border-radius: 12px;">
                <p class="mt-3 text-muted"><small>Multiscale Modelling & Simulation Lab<br>NED University of Engineering and Technology</small></p>
            </div>

            <!-- Right Side: Contact Details (Left-aligned) -->
            <div class="col-lg-7">
                <div class="card border-0 shadow-sm">
                    <div class="card-body p-4">
                        <h4 class="card-title mb-4">Get in Touch</h4>
                        
                        <div class="mb-3">
                            <i class="bi bi-geo-alt-fill text-primary me-3"></i>
                            <strong>Address:</strong><br>
                            Multiscale Modelling & Simulation Lab<br>
                            Department of Mechanical Engineering<br>
                            NED University of Engineering and Technology<br>
                            University Road, Karachi-75270, Pakistan
                        </div>

                        <div class="mb-3">
                            <i class="bi bi-envelope-fill text-primary me-3"></i>
                            <strong>Email:</strong><br>
                            <a href="mailto:mmslab@neduet.edu.pk">mmslab@neduet.edu.pk</a>
                        </div>

                        <div class="mb-3">
                            <i class="bi bi-telephone-fill text-primary me-3"></i>
                            <strong>Phone:</strong><br>
                            +92-21-99261261-8 Ext: 2208<br>
                            (or relevant extension)
                        </div>

                        <div class="mb-3">
                            <i class="bi bi-person-circle text-primary me-3"></i>
                            <strong>Lab Head:</strong><br>
                            Dr. [Name] (Principal Investigator)
                        </div>

                        <!-- Optional Social / Links -->
                        <div class="mt-4">
                            <a href="#" class="btn btn-outline-primary me-2"><i class="bi bi-globe"></i> Website</a>
                            <a href="#" class="btn btn-outline-primary me-2"><i class="bi bi-google"></i> Google Scholar</a>
                            <a href="#" class="btn btn-outline-primary"><i class="bi bi-github"></i> GitHub</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

    <!-- Footer -->
    <footer class="bg-dark text-white text-center py-4">
        <p>&copy; <?php echo date("Y"); ?> Multiscale Modelling & Simulation Lab, NED University of Engineering and Technology. All rights reserved.</p>
    </footer>

    <script src="js/bootstrap.bundle.min.js"></script>
    <script src="js/custom.js"></script>
</body>
</html>