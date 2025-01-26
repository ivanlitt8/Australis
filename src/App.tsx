import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale";
import emailjs from "@emailjs/browser";
import {
  MapPin,
  Phone,
  Home,
  Star,
  Wifi,
  Car,
  Tv,
  Mail,
  UtensilsCrossed,
  BedDouble,
  DoorOpen,
  Building,
  Droplets,
} from "lucide-react";

registerLocale("es", es);

function App() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    nombre: "",
    apellido: "",
    email: "",
    fechas: "",
  });

  const amenities = [
    { icon: <Wifi className="w-6 h-6" />, name: "WiFi de alta velocidad" },
    { icon: <Tv className="w-6 h-6" />, name: "Smart TV" },
    { icon: <UtensilsCrossed className="w-6 h-6" />, name: "Cocina equipada" },
    { icon: <Car className="w-6 h-6" />, name: "Estacionamiento" },
    { icon: <BedDouble className="w-6 h-6" />, name: "Ropa de cama" },
    { icon: <DoorOpen className="w-6 h-6" />, name: "Entrada independiente" },
    {
      icon: <Building className="w-6 h-6" />,
      name: "Alojamiento de un solo piso",
    },
    { icon: <Droplets className="w-6 h-6" />, name: "Agua Caliente" },
  ];

  const testimonials = [
    {
      name: "Diego Uccello",
      comment: "Bellísimo lugar. Muchas gracias!",
      rating: 5,
    },
    {
      name: "Emilio Vargas",
      comment: "Muy lindo lugar, excelente ubicación.",
      rating: 5,
    },
    {
      name: "Carolina Conta",
      comment: "Lugar confortable, cómodo y con una vista impresionante.",
      rating: 5,
    },
    {
      name: "Ana Silva",
      comment: "Un lugar mágico para desconectar y disfrutar de la naturaleza.",
      rating: 5,
    },
  ];

  const galleryImages = [
    "https://i.ibb.co/qJRy4Q9/Captura-de-pantalla-2025-01-25-223702.png",
    "https://i.ibb.co/CVXXNXL/IMG-20250113-WA0001.jpg",
    "https://i.ibb.co/Y2TcJnb/IMG-20250113-WA0009.jpg",
    "https://i.ibb.co/C858jt0/IMG-20250113-WA0008.jpg",
    "https://i.ibb.co/C0bNttf/IMG-20250113-WA0007.jpg",
    "https://i.ibb.co/G5PMkKV/IMG-20250113-WA0015.jpg",
    "https://i.ibb.co/2sjSK4t/c3cc6879-66f1-4c38-b625-ff1a6ffd33ce.jpg",
    "https://i.ibb.co/9TJKWJP/Cascada-Corbata-Blanca-El-Hoyo-Chubut.jpg",
    "https://i.ibb.co/W0tgfFx/Puerto-Patriada-Chubut.jpg",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      nombre: "",
      apellido: "",
      email: "",
      fechas: "",
    };

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
      isValid = false;
    }

    if (!formData.apellido.trim()) {
      newErrors.apellido = "El apellido es requerido";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
      isValid = false;
    }

    if (!startDate || !endDate) {
      newErrors.fechas = "Ambas fechas son requeridas";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const templateParams = {
          nombre: formData.nombre,
          apellido: formData.apellido,
          email: formData.email,
          telefono: formData.telefono || "No especificado",
          fecha_llegada: startDate?.toLocaleDateString("es-AR"),
          fecha_salida: endDate?.toLocaleDateString("es-AR"),
        };

        await emailjs.send(
          "service_vnk7sbc",
          "template_yxsestj",
          templateParams,
          "_PKwWhxn5EhMCRm7j"
        );

        // Limpiar el formulario
        setFormData({
          nombre: "",
          apellido: "",
          telefono: "",
          email: "",
        });
        setStartDate(null);
        setEndDate(null);

        alert("¡Consulta enviada con éxito! Te contactaremos pronto.");
      } catch (error) {
        console.error("Error al enviar el correo:", error);
        alert(
          "Hubo un error al enviar la consulta. Por favor, intenta nuevamente."
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handlePrevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(
        selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1
      );
    }
  };

  const handleNextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(
        selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1
      );
    }
  };

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const menuItems = [
    { href: "#servicios", label: "Servicios" },
    { href: "#comarca", label: "Ubicación" },
    { href: "#testimonios", label: "Testimonios" },
    { href: "#galeria", label: "Galería" },
  ];

  useEffect(() => {
    document.body.style.backgroundColor = "#D1D8E0";
  }, []);

  return (
    <div className="min-h-screen bg-[#D1D8E0] font-poppins">
      {/* Hero Section */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 shadow-md">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <img
            src="https://i.ibb.co/5hNXj4M/Sin-t-tulo-removebg-preview.png"
            alt="Casa Australis Logo"
            className="h-16 w-auto"
          ></img>

          {/* Menú de escritorio */}
          <nav className="hidden md:flex space-x-4 font-poppins font-medium">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-md sm:text-xl text-[#3A6B8D] hover:text-[#315874] transition-colors duration-400 "
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Botón hamburguesa */}
          <button
            onClick={handleMenuClick}
            className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Menú móvil */}
        <div
          className={`md:hidden fixed inset-0 z-40 transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out`}
        >
          <div className="relative w-full h-full">
            {/* Overlay con efecto blur */}
            <div
              className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
              onClick={closeMenu}
            />

            {/* Menú contenido */}
            <nav className="absolute left-0 top-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out">
              <div className="p-4">
                <img
                  src="https://i.ibb.co/5hNXj4M/Sin-t-tulo-removebg-preview.png"
                  alt="Casa Australis Logo"
                  className="h-16 w-auto mb-8"
                />
                <div className="flex flex-col space-y-4">
                  {menuItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                      className="text-gray-700 hover:text-blue-600 text-lg font-medium py-2 transition-colors duration-200"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <section className="relative min-h-screen pt-16">
        <img
          src="https://i.ibb.co/CVXXNXL/IMG-20250113-WA0001.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Casa Australis"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50">
          <div className="container mx-auto px-4 h-full py-12">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 h-full">
              {/* Contenido izquierdo con animación */}
              <div className="text-white mt-14 md:mt-12 lg:max-w-xl animate-fade-in-up">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-slide-in-left font-lora">
                  Bienvenidos a Casa Australis
                </h1>
                <p className="text-lg md:text-xl mb-8 animate-slide-in-left delay-200 font-poppins leading-relaxed">
                  Ubicada en El Hoyo, provincia de Chubut, Casa Australis ofrece
                  un espacio de descanso con impresionantes vistas a las
                  montañas. Su ambiente cálido y acogedor está diseñado para
                  brindarte la comodidad que necesitas.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 animate-slide-in-left delay-300">
                  <a
                    href="https://api.whatsapp.com/send/?phone=5492804626682"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-[#32d851] hover:bg-[#37b64f] text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 whitespace-nowrap transition-all duration-300"
                  >
                    <Phone className="w-5 h-5" />
                    Contactar por WhatsApp
                  </a>
                  <a
                    href="https://www.airbnb.com.ar/rooms/777856604774722545"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-[#ff5a60] hover:bg-[#f34e54] text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <Home className="w-5 h-5" />
                    Reservar en Airbnb
                  </a>
                  <a
                    href="https://maps.app.goo.gl/ZFRL7xvnFnDGTxRv7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <MapPin className="w-5 h-5" />
                    Ver ubicación
                  </a>
                </div>
              </div>

              {/* Formulario - visible en desktop, oculto en mobile */}
              <div className="hidden lg:block bg-white bg-opacity-90 rounded-lg shadow-xl p-6 w-full max-w-md animate-fade-in-up delay-300">
                <h2 className="text-2xl font-bold text-[#3A6B8D] mb-4">
                  Consulta disponibilidad
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.nombre && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.nombre}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Apellido *
                    </label>
                    <input
                      type="text"
                      name="apellido"
                      value={formData.apellido}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.apellido && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.apellido}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono (opcional)
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fecha de llegada *
                      </label>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        className="w-3/4 p-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500"
                        dateFormat="dd/MM/yyyy"
                        locale="es"
                        placeholderText="Selecciona fecha"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fecha de salida *
                      </label>
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        className="w-3/4 p-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500"
                        dateFormat="dd/MM/yyyy"
                        locale="es"
                        placeholderText="Selecciona fecha"
                      />
                    </div>
                  </div>
                  {errors.fechas && (
                    <p className="text-red-500 text-sm mt-1">{errors.fechas}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full ${
                      isSubmitting
                        ? "bg-[#3A6B8D]/70"
                        : "bg-[#3A6B8D] hover:bg-[#2d5470]"
                    } text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 mt-6 whitespace-nowrap transition-all duration-300`}
                  >
                    <Mail className="w-5 h-5" />
                    {isSubmitting ? "Enviando..." : "Enviar consulta"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario Section - visible solo en mobile */}
      <section className="lg:hidden py-16 bg-gray-50" id="consulta-mobile">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Consulta disponibilidad
          </h2>
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
                {errors.nombre && (
                  <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Apellido *
                </label>
                <input
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
                {errors.apellido && (
                  <p className="text-red-500 text-sm mt-1">{errors.apellido}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono (opcional)
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha de llegada *
                  </label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    className="w-3/4 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    dateFormat="dd/MM/yyyy"
                    locale="es"
                    placeholderText="Selecciona fecha"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha de salida *
                  </label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    className="w-3/4 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    dateFormat="dd/MM/yyyy"
                    locale="es"
                    placeholderText="Selecciona fecha"
                  />
                </div>
              </div>
              {errors.fechas && (
                <p className="text-red-500 text-sm mt-1">{errors.fechas}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full ${
                  isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                } text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 mt-6 whitespace-nowrap`}
              >
                <Mail className="w-5 h-5" />
                {isSubmitting ? "Enviando..." : "Enviar consulta"}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Servicios Section */}
      <section className="py-16" id="servicios">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#3A6B8D] text-center mb-12 font-lora">
            Lo que te espera en Casa Australis
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
            {amenities.map((amenity, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 sm:p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all text-center hover:bg-gradient-to-b hover:from-white hover:to-[#3A6B8D]/5"
              >
                <div className="text-[#4C7C49]">{amenity.icon}</div>
                <h3 className="mt-2 sm:mt-4 text-sm sm:text-lg font-semibold text-[#3A6B8D] font-lora">
                  {amenity.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comarca Andina Section */}
      <section className="py-16 bg-[#D1D8E0]/30" id="comarca">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#3A6B8D] text-center mb-8 font-lora">
            Descubre la Comarca Andina
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src="https://i.ibb.co/9TJKWJP/Cascada-Corbata-Blanca-El-Hoyo-Chubut.jpg"
                alt="Paisaje de la Comarca Andina"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-[#4C7C49] font-lora">
                Un paraíso en la Patagonia
              </h3>
              <p className="text-gray-600 mb-4 font-poppins leading-relaxed">
                La Comarca Andina del Paralelo 42° es una región única, rodeada
                de paisajes que parecen salidos de un sueño. Ubicada entre las
                provincias de Río Negro y Chubut, esta área ofrece lagos
                cristalinos, montañas imponentes y bosques milenarios.
              </p>
              <p className="text-gray-600 mb-4 font-poppins leading-relaxed">
                Casa Australis está a tan solo 6 minutos de la impresionante
                Catarata Corbata Blanca, uno de los destinos más visitados de la
                zona.
              </p>
              <a
                href="https://maps.app.goo.gl/vdk5DzeFsb7rqRp99"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#3A6B8D] hover:text-[#4C7C49] transition-colors px-4 py-2 border border-[#3A6B8D] rounded-lg hover:border-[#4C7C49]"
              >
                <MapPin className="w-5 h-5" />
                <span>Ver ubicación</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios Section */}
      <section className="py-16" id="testimonios">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#3A6B8D] text-center mb-12 font-lora">
            Lo que dicen nuestros huéspedes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all hover:bg-[#D69F6A]/30"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-[#4C7C49] fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 font-poppins italic">
                  "{testimonial.comment}"
                </p>
                <p className="font-semibold text-[#3A6B8D] font-lora">
                  {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galería Section */}
      <section className="py-16 bg-gray-50" id="galeria">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#3A6B8D] text-center mb-12 font-lora">
            Descubre Nuestro Espacio
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((url, index) => (
              <div
                key={index}
                onClick={() => handleImageClick(index)}
                className="cursor-pointer"
              >
                <img
                  src={url}
                  alt={`Imagen de Casa Australis ${index + 1}`}
                  className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-lg transition-all"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal de Galería */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black bg-opacity-75 backdrop-blur-sm"
            onClick={handleCloseModal}
          />
          <div className="relative z-10 max-w-6xl w-full mx-4">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <img
              src={galleryImages[selectedImage]}
              alt={`Imagen de Casa Australis ${selectedImage + 1}`}
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#3A6B8D] text-white py-8 font-poppins">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 Casa Australis. Todos los derechos reservados.</p>
          <p className="mt-2">
            Desarrollado por{" "}
            <a
              href="https://portfolio-ivan-litt.netlify.app/"
              className="text-[#D1D8E0] hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Studio88
            </a>
          </p>
        </div>
      </footer>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap');

          /* Estilos base para las fuentes */
          h1, h2, h3, .font-lora {
            font-family: 'Lora', serif;
          }

          body, p, a, button, input, label, .font-poppins {
            font-family: 'Poppins', sans-serif;
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
          }

          .animate-slide-in-left {
            animation: slideInLeft 0.6s ease-out forwards;
          }

          .delay-200 {
            animation-delay: 200ms;
          }

          .delay-300 {
            animation-delay: 300ms;
          }
        `}
      </style>
    </div>
  );
}

export default App;
