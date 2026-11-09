/* PRABIR.DEV v2 — app.js (external file).
   ROOT-CAUSE FIX: the old site kept its JavaScript inline and the demo()
   function returned a full HTML document as a template literal containing
   literal closing-tag strings. Chrome cut the inline script off at that
   point, so render() never ran. Here ALL logic lives in this external file
   and NO string in it contains a literal closing tag such as the ones that
   broke the old site. Demo previews are built with DOM nodes, not with a
   full HTML document string. */

/* ===== Google sign-in CONFIG =====
   Google OAuth client ID for PRABIR.DEV (Web application, authorised
   JavaScript origin https://prabir-sell.github.io). Reviews REQUIRE
   Google sign-in: nobody can post a review without authorising with
   their Google account, and the signed-in Google name is used for the
   review. NOTE: reviews are still stored in localStorage (this browser
   only) until a backend is added — sign-in verifies identity, it does
   not yet share reviews across devices. */
const GOOGLE_CLIENT_ID = "923578354054-o0p3c9tg7b15fg6maknogtvvrbmve7mb.apps.googleusercontent.com";
const WA_NUMBER = "918777824316";
const WA_BASE = "https://wa.me/" + WA_NUMBER;

/* ===== Data — copied exactly from the original site ===== */
const TEMPLATES = [
  {id:1, name:"Restaurant Website", price:999, cat:"Restaurant", col:"#e8590c", lay:0, head:"Fresh food, served warm", feat:["Online menu","Table booking form","Gallery","Opening hours","Map section"]},
  {id:2, name:"Hotel & Resort Website", price:1999, cat:"Travel", col:"#0b7285", lay:1, head:"Stay somewhere unforgettable", feat:["Room listings","Booking enquiry","Amenities","Gallery","Location map"]},
  {id:3, name:"Photography Website", price:799, cat:"Portfolio", col:"#adb5bd", lay:2, head:"Moments, framed", feat:["Masonry gallery","Packages","Booking form","About photographer"]},
  {id:4, name:"Personal Portfolio", price:499, cat:"Personal", col:"#7048e8", lay:3, head:"Hi, I design & build things", feat:["Projects","Skills","Resume link","Contact form"]},
  {id:5, name:"Coaching Centre", price:1499, cat:"Education", col:"#2f9e44", lay:0, head:"Learn. Practise. Succeed.", feat:["Courses","Batch timings","Faculty","Admission enquiry"]},
  {id:6, name:"School Website", price:1999, cat:"Education", col:"#1971c2", lay:1, head:"A place to grow", feat:["Notices","Admissions","Faculty","Gallery","Contact"]},
  {id:7, name:"Real Estate", price:1499, cat:"Business", col:"#c92a2a", lay:2, head:"Find the property that fits", feat:["Property listings","Filters","Enquiry form","Agent profile"]},
  {id:8, name:"Medical Clinic", price:999, cat:"Healthcare", col:"#0ca678", lay:3, head:"Care you can trust", feat:["Doctor profiles","Appointment form","Services","Timings"]},
  {id:9, name:"Gym & Fitness", price:799, cat:"Business", col:"#f03e3e", lay:0, head:"Train harder. Live better.", feat:["Memberships","Trainers","Class timetable","Join form"]},
  {id:10, name:"Beauty Salon", price:799, cat:"Business", col:"#d6336c", lay:1, head:"Look good, feel great", feat:["Services & rates","Gallery","Booking form","Offers"]},
  {id:11, name:"E-commerce", price:2999, cat:"Online Store", col:"#e67700", lay:2, head:"Shop the collection", feat:["Product grid","Cart (front-end)","Categories","WhatsApp checkout"]},
  {id:12, name:"Digital Agency", price:999, cat:"Professional", col:"#4263eb", lay:3, head:"We grow brands online", feat:["Services","Case studies","Team","Contact"]},
  {id:13, name:"Travel Agency", price:999, cat:"Travel", col:"#1098ad", lay:0, head:"Your next trip starts here", feat:["Tour packages","Destinations","Enquiry form","Gallery"]},
  {id:14, name:"Wedding Planner", price:799, cat:"Business", col:"#b5446e", lay:1, head:"Your day, perfectly planned", feat:["Packages","Gallery","Services","Enquiry form"]},
  {id:15, name:"Electronics Shop", price:999, cat:"Online Store", col:"#364fc7", lay:2, head:"Latest gadgets, best prices", feat:["Product showcase","Brands","Offers","Store location"]},
  {id:16, name:"Grocery Store", price:999, cat:"Online Store", col:"#37b24d", lay:3, head:"Fresh groceries, every day", feat:["Categories","Offers","Order on WhatsApp","Delivery areas"]},
  {id:17, name:"Xerox & Printing", price:499, cat:"Business", col:"#495057", lay:0, head:"Print. Copy. Done.", feat:["Services & rates","Upload & order","Timings","Location"]},
  {id:18, name:"Lawyer Portfolio", price:799, cat:"Professional", col:"#8a6d3b", lay:1, head:"Clear advice. Strong representation.", feat:["Practice areas","Attorney profile","Consultation form","Contact"]},
  {id:19, name:"Event Management", price:999, cat:"Business", col:"#9c36b5", lay:2, head:"Events people remember", feat:["Event types","Gallery","Packages","Enquiry form"]},
  {id:20, name:"Digital Visiting Card", price:299, cat:"Personal", col:"#ff7a18", lay:3, head:"Your business card, online", feat:["One-page profile","Save contact","Social links","WhatsApp button"]}
];
const FEATURED_IDS = [1, 5, 11, 12, 20];
const CATS = ["Business","Restaurant","Education","Healthcare","Portfolio","Professional","Online Store","Travel","Personal"];
const PLANS = [
  {name:"Free", price:0, updates:"1 update every 6 months", cadence:"One update in each six-month period", feat:["One small text or image update every 6 months","No monthly fee","Request updates through WhatsApp"]},
  {name:"Starter", price:199, updates:"2 updates / month", cadence:"Up to 2 update requests each month", feat:["Text and image updates","Small content corrections","WhatsApp update requests"]},
  {name:"Growth", price:399, updates:"4 updates / month", cadence:"Up to 4 update requests each month", feat:["Everything in Starter","Product, service and gallery updates","Priority update queue"]},
  {name:"Pro", price:799, updates:"10 updates / month", cadence:"Up to 10 update requests each month", feat:["Everything in Growth","Small content and image refreshes","Highest priority update queue"]}
];
const WHY = ["Affordable Pricing","Professional Designs","White-Label Websites","Complete Source Code","Mobile Responsive","Free Hosting Option","Optional Maintenance","Direct WhatsApp Support"];
const HOW = ["Choose Your Website","View Live Demo","Message PRABIR.DEV","Complete UPI Payment","Website Customization","Receive Your Website"];
const FAQS = [
  ["Can I buy only the website without domain and hosting?","Yes. Pay only the original website price shown as 'Website only'. You receive the website files/source code and arrange your own domain and hosting."],
  ["What does the extra ₹3,500 cover?","It is an additional first-year charge for domain registration and hosting when you choose the website + domain + hosting option. The website price remains separate."],
  ["Is website purchase one-time?","Yes. The website-only price is a one-time website fee. If you choose domain and hosting, add ₹3,500 for the first year. Renewal after the first year is separate."],
  ["Is maintenance compulsory?","No. Maintenance is optional."],
  ["Can I use my own domain?","Yes."],
  ["Will I receive source code?","Yes."],
  ["Can I use my own branding?","Yes. All websites are White-Label."],
  ["Is domain and hosting included?","Only if you choose the optional website + domain + hosting option. Add ₹3,500 to the original website price for the first year. If you choose website-only, domain and hosting are not included and you use your own."],
  ["What happens if maintenance expires?","Your website remains yours and remains accessible as long as hosting is active."]
];
/* No seeded reviews: only genuine reviews posted by visitors who signed
   in with Google are shown. Never invent reviews from real-sounding
   people — a fake review shown as real would mislead buyers. */
const SAMPLE_REVIEWS = [];

/* ===== Helpers (DOM only — no HTML strings with closing tags) ===== */
function $(s){ return document.querySelector(s); }
function el(tag, cls, text){
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text !== undefined && text !== null) n.textContent = text;
  return n;
}
function inr(n){ return "\u20B9" + Number(n).toLocaleString("en-IN"); }
const DOMAIN_HOSTING_YEAR = 3500;
function packagePrice(t){ return Number(t.price) + DOMAIN_HOSTING_YEAR; }
function packageBreakdown(t){ return "Website only: " + inr(t.price) + " | Optional first-year domain + hosting: + " + inr(DOMAIN_HOSTING_YEAR) + " | Total with domain + hosting: " + inr(packagePrice(t)); }
function waLink(msg){ return WA_BASE + "?text=" + encodeURIComponent(msg); }
function payMessage(t){
  return "Hello PRABIR.DEV! I am interested in the " + t.name + ". Website only: " + inr(t.price) + ". Optional 1-year domain + hosting: add " + inr(DOMAIN_HOSTING_YEAR) + ". Total with domain + hosting: " + inr(packagePrice(t)) + ". Please confirm which option I choose and share the details.";
}
function byId(id){ return TEMPLATES.find(function(t){ return t.id === id; }); }
function stars(n){
  let s = "";
  for (let i = 0; i < 5; i++) s += (i < n) ? "\u2605" : "\u2606";
  return s;
}
function clear(node){ while (node.firstChild) node.removeChild(node.firstChild); }

/* ===== Template cards ===== */
function makeCard(t){
  const card = el("article", "card");
  const thumb = el("div", "thumb");
  thumb.style.background = "linear-gradient(135deg," + t.col + ",#111)";
  const tag = el("span", "tag", t.cat);
  thumb.appendChild(tag);
  const nameInThumb = el("span", null, " " + t.name);
  thumb.appendChild(nameInThumb);
  card.appendChild(thumb);
  const body = el("div", "cardbody");
  const h = el("h3", null, t.name);
  body.appendChild(h);
  if (FEATURED_IDS.indexOf(t.id) !== -1){
    body.appendChild(el("span", "feat-badge", "FEATURED"));
  }
  body.appendChild(el("p", "feat", t.head + " — " + t.feat.slice(0, 3).join(" · ")));
  const priceOptions = el("div", "card-price-options");
  const ownPrice = el("p", "price", inr(t.price) + " ");
  ownPrice.appendChild(el("small", null, "website only · no domain/hosting"));
  const hostedPrice = el("p", "price hosted-price", inr(packagePrice(t)) + " ");
  hostedPrice.appendChild(el("small", null, "website + 1-year domain & hosting"));
  priceOptions.append(ownPrice, hostedPrice);
  body.appendChild(priceOptions);
  body.appendChild(el("p", "price-note", "Add ₹3,500 for first-year domain + hosting. Choose either option."));
  const row = el("div", "btnrow");
  const demoBtn = el("a", "btn small ghost", "Live Demo");
  if (t.id === 1){ demoBtn.href = "demos/restaurant/index.html"; demoBtn.target = "_blank"; demoBtn.rel = "noopener"; }
  else { demoBtn.href = "#/product/" + t.id; }
  const buyBtn = el("a", "btn small green", "Buy Now");
  buyBtn.href = "#/product/" + t.id;
  const detBtn = el("a", "btn small", "Details");
  detBtn.href = "#/product/" + t.id;
  row.appendChild(demoBtn); row.appendChild(buyBtn); row.appendChild(detBtn);
  body.appendChild(row);
  card.appendChild(body);
  return card;
}

let currentCat = "";
function renderGrid(){
  const grid = $("#productGrid");
  const q = $("#searchQ").value.trim().toLowerCase();
  const cat = $("#catFilter").value;
  const sort = $("#priceSort").value;
  let list = TEMPLATES.slice();
  if (q) list = list.filter(function(t){ return (t.name + " " + t.cat + " " + t.feat.join(" ")).toLowerCase().indexOf(q) !== -1; });
  if (cat) list = list.filter(function(t){ return t.cat === cat; });
  if (sort === "a") list.sort(function(a,b){ return a.price - b.price; });
  if (sort === "h") list.sort(function(a,b){ return b.price - a.price; });
  if (sort === "n") list.sort(function(a,b){ return b.id - a.id; });
  clear(grid);
  list.forEach(function(t){ grid.appendChild(makeCard(t)); });
  $("#productCount").textContent = list.length + " website" + (list.length === 1 ? "" : "s") + " shown";
}
function renderPills(){
  const wrap = $("#catPills");
  clear(wrap);
  const all = el("button", "pill" + (currentCat === "" ? " active" : ""), "All");
  all.type = "button";
  all.addEventListener("click", function(){ currentCat = ""; $("#catFilter").value = ""; renderPills(); renderGrid(); });
  wrap.appendChild(all);
  CATS.forEach(function(c){
    const b = el("button", "pill" + (currentCat === c ? " active" : ""), c);
    b.type = "button";
    b.addEventListener("click", function(){ currentCat = c; $("#catFilter").value = c; renderPills(); renderGrid(); });
    wrap.appendChild(b);
  });
}

/* ===== Product detail + live demo preview (DOM only) ===== */
function buildDemo(t){
  const demo = el("div", "demo");
  const nav = el("div", "demo-nav");
  nav.appendChild(el("b", null, "Your Brand"));
  const navSpan = el("span", null, "Home · Features · Contact");
  nav.appendChild(navSpan);
  demo.appendChild(nav);
  const hero = el("div", "demo-hero");
  hero.style.background = "linear-gradient(135deg," + t.col + ",#222)";
  hero.appendChild(el("h3", null, t.head));
  hero.appendChild(el("p", null, "Replace this text with your own business description."));
  demo.appendChild(hero);
  const feats = el("div", "demo-feats");
  t.feat.forEach(function(f, i){
    const box = el("div");
    box.appendChild(el("b", null, (i + 1) + ". " + f));
    box.appendChild(el("p", null, "Fully editable section for your " + t.name.toLowerCase() + "."));
    feats.appendChild(box);
  });
  demo.appendChild(feats);
  const foot = el("div", "demo-feats");
  const fb = el("div");
  fb.appendChild(el("b", null, "Get in touch"));
  fb.appendChild(el("p", null, "Contact form, phone and WhatsApp button included."));
  foot.appendChild(fb);
  demo.appendChild(foot);
  return demo;
}

function imagePromptFor(t){
  const scene = {
    "Hotel & Resort Website":"luxury boutique resort exterior, premium guest suite, infinity pool, warm hospitality, tropical landscaping",
    "Medical Clinic":"modern Indian dental and medical clinic, bright hygienic treatment room, friendly professional doctor, premium healthcare photography",
    "Restaurant Website":"premium modern restaurant interior, beautifully plated signature cuisine, warm ambient lighting, editorial food photography",
    "Photography Website":"professional photographer portfolio, cinematic wedding and portrait photography contact sheet, elegant studio mood",
    "Personal Portfolio":"minimal creative developer workspace, laptop with elegant portfolio website, desk details, modern editorial composition",
    "Coaching Centre":"bright Indian coaching classroom, focused students studying, teacher explaining at smart board, welcoming education photography",
    "School Website":"modern Indian school campus, students in uniform, green courtyard, bright classrooms, trustworthy education photography",
    "Real Estate":"premium contemporary Indian apartment and villa architecture, landscaped property, golden hour real estate photography",
    "Gym & Fitness":"premium modern fitness studio, athletic training session, professional gym equipment, dramatic natural light",
    "Beauty Salon":"luxury beauty salon interior, professional stylist at work, elegant beauty treatment, soft neutral palette",
    "E-commerce":"premium ecommerce product photography studio, curated products on clean seamless background, modern retail art direction",
    "Digital Agency":"modern creative digital agency studio, designers collaborating around large screens, clean technology workspace",
    "Travel Agency":"beautiful Indian travel destination, scenic mountain or coastal landscape, boutique travel editorial photography",
    "Wedding Planner":"elegant Indian wedding decor, floral mandap, candlelit reception tables, refined luxury event photography",
    "Electronics Shop":"premium consumer electronics product display, laptop smartphone headphones on modern retail counter",
    "Grocery Store":"fresh vegetables fruits and grocery products arranged in a clean modern neighbourhood store",
    "Xerox & Printing":"professional print and copy centre, modern large-format printer, neatly stacked documents and stationery",
    "Lawyer Portfolio":"professional Indian law office, legal books, polished desk, confident advocate in formal attire, trustworthy corporate photography",
    "Event Management":"premium corporate event stage, lighting truss, elegant venue setup, audience atmosphere",
    "Digital Visiting Card":"minimal premium business identity still life, elegant smartphone displaying digital contact card, neutral studio background"
  };
  return "Create an ultra-realistic premium website visual asset for a " + t.name + ". Scene: " + (scene[t.name] || "professional business environment and service photography") + ". Art direction: polished commercial photography, natural realistic lighting, refined composition, authentic details, premium brand aesthetic, high resolution, landscape 16:9, no text, no logos, no watermark. Keep clear negative space for website headline overlay. This is an original visual for PRABIR.DEV demo website, not a copy of any existing brand.";
}
/* ===== Restaurant demo photos (lazy-loaded, only for template 1) ===== */
function loadRestoPhotos(cb){
  if(window.RESTO_PHOTOS){ cb(); return; }
  var s=document.createElement("script");
  s.src="demos/restaurant/photos.js";
  s.onload=function(){ cb(); };
  s.onerror=function(){ cb(); };
  document.head.appendChild(s);
}
function renderDetail(id){
  const box = $("#detailBox"); clear(box);
  const t = byId(id);
  if (!t){ box.appendChild(el("p","sub","Product not found.")); const b=el("a","btn","Back to Product"); b.href="#/buy"; box.appendChild(b); return; }
  const pages = {
    "Restaurant Website":["Home","Our Story","Menu","Gallery","Reservations","Location","Contact"],
    "Hotel & Resort Website":["Home","About the Property","Rooms & Suites","Amenities","Experiences","Availability","Gallery","Location","Contact"],
    "Photography Website":["Home","Portfolio","Photography Services","Packages","About Photographer","Gallery","Booking","Location","Contact"],
    "Personal Portfolio":["Home","About Me","Skills","Projects","Experience","Testimonials","Contact"],
    "Coaching Centre":["Home","About Institute","Courses","Faculty","Batch Timings","Results","Admission","Location","Contact"],
    "School Website":["Home","About School","Academics","Admissions","Faculty","Campus & Facilities","News","Location","Contact"],
    "Real Estate":["Home","Properties","Property Details","About Agency","Agents","Neighborhood","Enquiry","Location","Contact"],
    "Medical Clinic":["Home","About Clinic","Doctors","Services","Patient Information","Appointment","Gallery","Location","Contact"],
    "Gym & Fitness":["Home","About Gym","Programs","Trainers","Membership","Class Timetable","Gallery","Location","Contact"],
    "Beauty Salon":["Home","About Salon","Services & Pricing","Our Team","Gallery","Offers","Booking","Location","Contact"],
    "E-commerce":["Home","Shop","Categories","Product Details","About Store","Cart","Shipping & Returns","Contact"],
    "Digital Agency":["Home","About Agency","Services","Our Work","Case Studies","Team","Insights","Contact","Location"],
    "Travel Agency":["Home","Destinations","Tour Packages","Experiences","About Agency","Gallery","Enquiry","Location","Contact"],
    "Wedding Planner":["Home","About Planner","Services","Packages","Wedding Gallery","Our Process","Enquiry","Location","Contact"],
    "Electronics Shop":["Home","Products","Categories","Offers","About Store","Service & Support","Store Location","Contact"],
    "Grocery Store":["Home","Shop","Categories","Fresh Picks","Offers","Delivery Areas","Store Location","Contact"],
    "Xerox & Printing":["Home","Printing Services","Xerox & Scanning","Binding & Lamination","Price List","How It Works","Location","Contact"],
    "Lawyer Portfolio":["Home","About Advocate","Practice Areas","Experience","Legal Insights","Consultation","Chamber Location","Contact"],
    "Event Management":["Home","About Us","Event Services","Our Work","Packages","Planning Process","Enquiry","Location","Contact"],
    "Digital Visiting Card":["Profile","About","Services","Portfolio","Social Links","Save Contact","Contact Details"]
  };
  const sections=pages[t.name]||["Home","About","Services","Gallery","Location","Contact"];
  const back=el("a","detail-back","← Back to all 20 websites"); back.href="#/buy"; box.appendChild(back);
  const crumb=el("div","product-breadcrumb","PRABIR.DEV  /  WEBSITE COLLECTION  /  "+t.name.toUpperCase()); box.appendChild(crumb);
  const hero=el("section","product-hero"); hero.style.setProperty("--product-accent",t.col);
  const copy=el("div","product-hero-copy");
  copy.appendChild(el("span","product-eyebrow",t.cat+" WEBSITE · COMPLETE MULTI-PAGE PACKAGE"));
  copy.appendChild(el("h1",null,t.name));
  copy.appendChild(el("p",null,t.head+" A premium, responsive multi-page website concept with dedicated pages for your business, services, gallery and customer visits."));
  const pricebox=el("div","package-price-box");
  pricebox.appendChild(el("span","package-label","CHOOSE YOUR PURCHASE OPTION"));
  const ownOption=el("div","price-option"); ownOption.appendChild(el("b",null,"1. WEBSITE ONLY")); ownOption.appendChild(el("strong","option-price",inr(t.price))); ownOption.appendChild(el("p",null,"No domain or hosting included. You use your own domain and hosting."));
  const hostedOption=el("div","price-option featured-option"); hostedOption.appendChild(el("b",null,"2. WEBSITE + DOMAIN + HOSTING")); hostedOption.appendChild(el("strong","option-price",inr(packagePrice(t)))); hostedOption.appendChild(el("p",null,inr(t.price)+" website price + ₹3,500 first-year domain & hosting."));
  pricebox.append(ownOption,hostedOption);
  pricebox.appendChild(el("p","package-includes","Domain + hosting option covers the first 1 year only. Renewal after year one is separate and depends on the provider and domain extension."));
  copy.appendChild(pricebox);
  const actions=el("div","btnrow"); const buy=el("a","btn product-buy","CHOOSE OPTION / ORDER ON WHATSAPP"); buy.href=waLink(payMessage(t)); buy.target="_blank"; buy.rel="noopener"; const demoLink=el("a","btn ghost","Explore website pages ↓"); demoLink.href="#product-pages"; demoLink.addEventListener("click",function(e){e.preventDefault(); nav.scrollIntoView({behavior:"smooth",block:"start"});}); if(t.id===1){const openDemo=el("a","btn","OPEN LIVE RESTAURANT DEMO"); openDemo.href="demos/restaurant/index.html"; openDemo.target="_blank"; openDemo.rel="noopener"; actions.append(openDemo);} actions.append(buy,demoLink); copy.appendChild(actions);
  const visual=el("div","product-visual"); visual.appendChild(el("div","visual-window-top","●  ●  ●     ORIGINAL BUSINESS WEBSITE CONCEPT"));
  const visualInner=el("div","visual-window-inner"); visualInner.style.background="linear-gradient(135deg,"+t.col+"dd,#101820)"; visualInner.appendChild(el("span","visual-kicker","A WEBSITE MADE FOR YOUR BUSINESS")); visualInner.appendChild(el("strong",null,t.head)); visualInner.appendChild(el("small",null,"Responsive · Multi-page · Customizable")); visual.appendChild(visualInner); hero.append(copy,visual); box.appendChild(hero);
  const nav=el("nav","detail-page-nav"); nav.id="product-pages"; nav.setAttribute("aria-label","Website page sections"); nav.appendChild(el("b",null,"INSIDE THIS WEBSITE")); sections.forEach(function(label,i){const a=el("a",null,label); a.href="#demo-section-"+i; nav.appendChild(a);}); box.appendChild(nav);
  const overview=el("section","product-overview"); overview.appendChild(el("div","section-kicker","01 / WEBSITE STRUCTURE")); overview.appendChild(el("h2",null,"A complete website, not just a single landing page")); overview.appendChild(el("p","section-lead","Every template opens as its own product page inside PRABIR.DEV. The delivered website is planned with dedicated, connected sections. Business-specific text, images, prices and real contact details will be added during customization."));
  const featureGrid=el("div","pro-feature-grid"); t.feat.forEach(function(f,i){const c=el("article","pro-feature"); c.appendChild(el("span","feature-index",String(i+1).padStart(2,"0"))); c.appendChild(el("h3",null,f)); c.appendChild(el("p",null,"Dedicated responsive section designed around the needs of this business.")); featureGrid.appendChild(c);}); overview.appendChild(featureGrid); box.appendChild(overview);
  const showcase=el("section","showcase-section"); showcase.appendChild(el("div","section-kicker","02 / PAGE-BY-PAGE PREVIEW")); showcase.appendChild(el("h2",null,"Explore the pages included in this website")); showcase.appendChild(el("p","section-lead",t.id===1 ? "The restaurant demo is live with real photos — open it from the button above, or preview each page below." : "Photo placeholders are intentional. Your original Flow AI images can be added later without rebuilding the page layout."));
  const pageGrid=el("div","demo-page-grid"); sections.forEach(function(label,i){const card=el("article","demo-page-card"); card.id="demo-section-"+i; const image=el("div","demo-page-image"); image.style.setProperty("--tile",t.col); image.appendChild(el("span",null,String(i+1).padStart(2,"0"))); image.appendChild(el("small",null,t.id===1 ? "REAL PHOTO · OPEN THE LIVE DEMO" : "PHOTO SLOT · ADD YOUR IMAGE")); card.appendChild(image); card.appendChild(el("div","demo-page-copy")); card.lastChild.appendChild(el("h3",null,label)); card.lastChild.appendChild(el("p",null,"Professionally structured "+label.toLowerCase()+" page with responsive layout and clear navigation.")); pageGrid.appendChild(card);}); showcase.appendChild(pageGrid);
  if(t.id===1){
    var restoPagePhotos=["interior","chef","spread","dinner","rooftop","exterior","kitchen"];
    loadRestoPhotos(function(){
      if(!window.RESTO_PHOTOS) return;
      pageGrid.querySelectorAll(".demo-page-image").forEach(function(im,i){
        var k=restoPagePhotos[i];
        if(RESTO_PHOTOS[k]){ im.style.backgroundImage="url("+RESTO_PHOTOS[k]+")"; im.style.backgroundSize="cover"; im.style.backgroundPosition="center"; }
      });
    });
  }
  const photoGallery=el("div","photo-slot-gallery");
  if(t.id===1){
    photoGallery.appendChild(el("h3",null,"9 real photos inside the live restaurant demo"));
    var restoGallery=[["interior","Dining hall"],["biryani","Signature biryani"],["spread","Family spread"],["birthday","Birthday dinner"],["dinner","Family dinner"],["rooftop","Rooftop evening"],["kitchen","In the kitchen"],["chef","Chef plating"],["exterior","Park Street entrance"]];
    restoGallery.forEach(function(pair){var slot=el("div","photo-slot");slot.setAttribute("data-resto-photo",pair[0]);slot.appendChild(el("b",null,pair[1]));photoGallery.appendChild(slot);});
    loadRestoPhotos(function(){
      if(!window.RESTO_PHOTOS) return;
      photoGallery.querySelectorAll("[data-resto-photo]").forEach(function(slot){
        var k=slot.getAttribute("data-resto-photo");
        if(RESTO_PHOTOS[k]){ slot.style.backgroundImage="url("+RESTO_PHOTOS[k]+")"; slot.style.backgroundSize="cover"; slot.style.backgroundPosition="center"; slot.style.color="#fff"; slot.style.textShadow="0 1px 6px rgba(0,0,0,.85)"; }
      });
    });
  } else {
    photoGallery.appendChild(el("h3",null,"10 original photo slots — ready for your Flow AI images"));
    for(let i=0;i<10;i++){const slot=el("div","photo-slot");slot.appendChild(el("b",null,"PHOTO "+String(i+1).padStart(2,"0")));slot.appendChild(el("small",null,"Replace with your generated image"));photoGallery.appendChild(slot);}
  }
  showcase.appendChild(photoGallery); box.appendChild(showcase);
  const location=el("section","location-placeholder"); location.appendChild(el("div","section-kicker","03 / LOCATION & VISIT US")); location.appendChild(el("h2",null,"A dedicated page for customers who want to visit in person")); location.appendChild(el("p",null,"The final business owner can add a verified address, Google Maps embed, directions link, opening hours and branch details. These are editable placeholders until real business information is supplied.")); const map=el("div","map-placeholder"); map.appendChild(el("span",null,"MAP PLACEHOLDER")); map.appendChild(el("small",null,"Add verified Google Maps embed during customization")); location.appendChild(map); box.appendChild(location);
  const details=el("section","product-overview deliver-section"); details.appendChild(el("div","section-kicker","04 / PACKAGE DETAILS")); details.appendChild(el("h2",null,"What is included in the package")); const perks=el("div","deliver-grid"); ["Complete multi-page website structure","Responsive desktop and mobile layout","One-year domain registration allowance included","One-year hosting included","SEO-friendly page structure","Editable website files and source code","Original image slots — add your generated photos","Setup guidance and delivery support"].forEach(function(x){perks.appendChild(el("div","deliver-item","✓  "+x));}); details.appendChild(perks); box.appendChild(details);
  const final=el("section","product-final-cta"); final.appendChild(el("span","product-eyebrow","READY TO CUSTOMIZE?")); final.appendChild(el("h2",null,"Make this website yours.")); final.appendChild(el("p",null,"Message PRABIR.DEV to confirm the domain name, hosting provider, business content and delivery schedule before ordering.")); const wa=el("a","btn product-buy","ASK ABOUT THIS PACKAGE · "+inr(packagePrice(t))); wa.href=waLink(payMessage(t)); wa.target="_blank"; wa.rel="noopener"; final.appendChild(wa); box.appendChild(final);
}

/* ===== Static sections ===== */
/* ===== Home — itheit-style shop landing: pills + all 20 cards + FAQ ===== */
let homeCat = "";
function renderHomeGrid(){
  const grid = $("#homeGrid");
  let list = TEMPLATES.slice();
  if (homeCat) list = list.filter(function(t){ return t.cat === homeCat; });
  clear(grid);
  list.forEach(function(t){ grid.appendChild(makeCard(t)); });
  $("#homeCount").textContent = list.length + " website" + (list.length === 1 ? "" : "s") + " shown";
}
function renderHomePills(){
  const wrap = $("#homePills");
  clear(wrap);
  ["", "Business","Restaurant","Education","Healthcare","Portfolio","Professional","Online Store","Travel","Personal"].forEach(function(c){
    const b = el("button", "pill" + (homeCat === c ? " active" : ""), c === "" ? "All" : c);
    b.type = "button";
    b.addEventListener("click", function(){ homeCat = c; renderHomePills(); renderHomeGrid(); });
    wrap.appendChild(b);
  });
}
function renderHome(){
  renderHomePills();
  renderHomeGrid();
  const faq = $("#faqList");
  clear(faq);
  FAQS.forEach(function(f){
    const d = document.createElement("details");
    const s = document.createElement("summary");
    s.textContent = f[0];
    const p = document.createElement("p");
    p.textContent = f[1];
    d.appendChild(s); d.appendChild(p);
    faq.appendChild(d);
  });
}
function renderPricing(){
  const tblWrap = $("#priceTable");
  clear(tblWrap);
  const table = document.createElement("table");
  table.style.width = "100%";
  const thead = document.createElement("thead");
  const hr = document.createElement("tr");
  ["Website","Category","Website only (no domain/hosting)","Add for 1-year domain + hosting","Total with domain + hosting"].forEach(function(h){
    const th = document.createElement("th");
    th.textContent = h;
    th.style.textAlign = "left";
    th.style.padding = "8px";
    hr.appendChild(th);
  });
  thead.appendChild(hr);
  table.appendChild(thead);
  const tbody = document.createElement("tbody");
  TEMPLATES.forEach(function(t){
    const tr = document.createElement("tr");
    [t.name, t.cat, inr(t.price), inr(DOMAIN_HOSTING_YEAR), inr(packagePrice(t))].forEach(function(v){
      const td = document.createElement("td");
      td.textContent = v;
      td.style.padding = "8px";
      td.style.borderTop = "1px solid var(--line)";
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  tblWrap.appendChild(table);
  const pg = $("#planGrid");
  clear(pg);
  PLANS.forEach(function(p, i){
    const c = el("div", "card");
    c.appendChild(el("h3", null, p.name.toUpperCase()));
    const pr = el("p", "price", p.price === 0 ? "FREE" : inr(p.price) + " ");
    if (p.price > 0) pr.appendChild(el("small", null, "/ month"));
    c.appendChild(pr);
    c.appendChild(el("b", null, p.updates));
    c.appendChild(el("p", "plan-cadence", p.cadence));
    const ul = el("ul", "check");
    p.feat.forEach(function(f){ ul.appendChild(el("li", null, f)); });
    c.appendChild(ul);
    const b = el("a", "btn small green", "Choose " + p.name);
    b.href = waLink("Hello PRABIR.DEV! I want the " + p.name + " website update plan (" + (p.price === 0 ? "Free" : inr(p.price) + "/month") + ", " + p.updates + "). Please share the terms.");
    b.target = "_blank";
    b.rel = "noopener";
    c.appendChild(b);
    if (i === 1) c.style.borderColor = "var(--blurple)";
    pg.appendChild(c);
  });
}

/* ===== Reviews (local demo until Google sign-in is connected) ===== */
const REVIEW_KEY = "pdv2_reviews";
let signedInName = "";
let googleSignedIn = false;
function loadReviews(){
  try {
    const saved = JSON.parse(localStorage.getItem(REVIEW_KEY) || "[]");
    if (Array.isArray(saved) && saved.length) return saved;
  } catch (e) {}
  return [];
}
function saveReviews(list){
  try { localStorage.setItem(REVIEW_KEY, JSON.stringify(list)); } catch (e) {}
}
function renderReviews(){
  const list = loadReviews();
  const wrap = $("#reviewList");
  clear(wrap);
  const avg = list.length ? (list.reduce(function(s, r){ return s + r.stars; }, 0) / list.length).toFixed(1) : "—";
  $("#reviewCount").textContent = list.length + " reviews · average " + avg + " / 5 stars";
  if (!list.length){
    wrap.appendChild(el("p", "sub", "No reviews yet — sign in with Google and be the first to review PRABIR.DEV!"));
    return;
  }
  list.forEach(function(r){
    const card = el("div", "review");
    const head = el("div", "rhead");
    head.appendChild(el("b", null, r.name));
    head.appendChild(el("span", "stars", stars(r.stars)));
    head.appendChild(el("small", null, r.date || ""));
    if (r.sample) head.appendChild(el("span", "sample-tag", "SAMPLE"));
    card.appendChild(head);
    card.appendChild(el("p", null, r.text));
    wrap.appendChild(card);
  });
}
function initGoogle(){
  const btn = $("#gsiButton");
  btn.addEventListener("click", function(){
    if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID === "YOUR_GOOGLE_CLIENT_ID_HERE"){
      $("#gsiNote").textContent = "Google sign-in is not connected yet — the site owner must add a Google OAuth client ID (see the CONFIG comment at the top of app.js). You can still post a review below with your name; it is stored locally in this demo.";
      return;
    }
    try {
      if (window.google && window.google.accounts && window.google.accounts.id){
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: function(resp){
            googleSignedIn = true;
            signedInName = "Google user";
            $("#signedInAs").textContent = "Signed in with Google.";
            $("#gsiNote").textContent = "Signed in with Google. Your review will be posted under your Google name.";
            try {
              const payload = JSON.parse(atob(resp.credential.split(".")[1]));
              if (payload && payload.name){
                signedInName = payload.name;
                $("#revName").value = payload.name;
                $("#revName").readOnly = true;
                $("#signedInAs").textContent = "Signed in as " + payload.name + ".";
              }
            } catch (e) {}
          }
        });
        window.google.accounts.id.prompt();
      } else {
        $("#gsiNote").textContent = "Google sign-in script did not load. Check your connection and try again.";
      }
    } catch (e) {
      $("#gsiNote").textContent = "Google sign-in could not start: " + e.message;
    }
  });
}

/* ===== Router ===== */
const ROUTES = {
  "#/home": ["view-home", "home"],
  "#/buy": ["view-buy", "buy-here"],
  "#/product": ["view-buy", "product"],
  "#/pricing": ["view-pricing", "pricing"],
  "#/reviews": ["view-reviews", "reviews"],
  "#/contact": ["view-contact", "contact"]
};
function route(){
  const hash = window.location.hash || "#/home";
  let viewId = "view-home", title = "home";
  if (hash.indexOf("#/product/") === 0){
    viewId = "view-product"; title = "product";
    renderDetail(parseInt(hash.split("/")[2], 10));
  } else if (ROUTES[hash]){
    viewId = ROUTES[hash][0]; title = ROUTES[hash][1];
    if (viewId === "view-buy") renderGrid();
  } else {
    viewId = "view-home"; title = "home";
  }
  document.querySelectorAll(".view").forEach(function(v){ v.classList.toggle("on", v.id === viewId); });
  document.querySelectorAll(".chan").forEach(function(c){
    c.classList.toggle("active", c.getAttribute("data-route") === "#/" + title || (title === "product" && c.getAttribute("data-route") === "#/product"));
  });
  $("#topTitle").textContent = title;
  window.scrollTo(0, 0);
}

/* ===== Init — every id read here exists in index.html ===== */
function init(){
  document.querySelectorAll(".yr").forEach(function(n){ n.textContent = String(new Date().getFullYear()); });
  document.querySelectorAll("[data-route]").forEach(function(n){
    n.addEventListener("click", function(){ window.location.hash = n.getAttribute("data-route"); });
  });
  const catSel = $("#catFilter");
  const optAll = document.createElement("option");
  optAll.value = ""; optAll.textContent = "All categories";
  catSel.appendChild(optAll);
  CATS.forEach(function(c){
    const o = document.createElement("option");
    o.value = c; o.textContent = c;
    catSel.appendChild(o);
  });
  renderPills();
  $("#searchQ").addEventListener("input", renderGrid);
  $("#catFilter").addEventListener("change", function(){ currentCat = $("#catFilter").value; renderPills(); renderGrid(); });
  $("#priceSort").addEventListener("change", renderGrid);
  $("#pillProduct").addEventListener("click", function(){ $("#pillProduct").classList.add("active"); $("#pillPricing").classList.remove("active"); });
  $("#pillPricing").addEventListener("click", function(){
    $("#pillPricing").classList.add("active"); $("#pillProduct").classList.remove("active");
    window.location.hash = "#/pricing";
  });
  renderHome();
  renderPricing();
  renderReviews();
  renderGrid();
  $("#reviewForm").addEventListener("submit", function(e){
    e.preventDefault();
    if (!googleSignedIn){
      $("#gsiNote").textContent = "Please sign in with Google first — a review can only be posted after Google authorisation. Tap 'Sign in with Google' above.";
      $("#gsiButton").click();
      return;
    }
    const name = signedInName || $("#revName").value.trim();
    const text = $("#revText").value.trim();
    if (!name || !text) return;
    const list = loadReviews();
    list.unshift({name: name, stars: parseInt($("#revStars").value, 10), text: text, date: new Date().toISOString().slice(0, 10), sample: false});
    saveReviews(list);
    renderReviews();
    $("#revText").value = "";
    $("#gsiNote").textContent = "Thanks, " + name + "! Your review is posted under your Google name. (Stored in this browser for now — shared public reviews need a backend.)";
  });
  initGoogle();
  const moreBtn = $("#moreBtn");
  const moreMenu = $("#moreMenu");
  if (moreBtn && moreMenu){
    moreBtn.addEventListener("click", function(e){
      e.stopPropagation();
      const open = moreMenu.classList.toggle("open");
      moreBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("click", function(){ moreMenu.classList.remove("open"); moreBtn.setAttribute("aria-expanded","false"); });
    moreMenu.addEventListener("click", function(){ moreMenu.classList.remove("open"); moreBtn.setAttribute("aria-expanded","false"); });
  }
  window.addEventListener("hashchange", route);
  route();
}
document.addEventListener("DOMContentLoaded", init);
