const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf-8');

// Remove DashboardView component
code = code.replace(/const DashboardView = \(\{.*?};\n/s, '');

// Remove nav_dash rendering in Navbar
code = code.replace(/<button onClick=\{\(\) => setActiveView\('dashboard'\)} className=\{`text-sm font-bold transition-colors \$\{activeView === 'dashboard' \? 'text-emerald-600' : 'text-slate-500 hover:text-slate-900'\}`\}>\{t\.nav_dash\}<\/button>\n?/g, '');

// Remove login button referencing dashboard in Navbar
code = code.replace(/<button onClick=\{\(\) => setActiveView\('dashboard'\)} className="hidden sm:flex bg-slate-900 hover:bg-slate-800 text-white px-5 py-2\.5 rounded-xl font-bold text-sm shadow-md transition-all">\n\s*\{t\.nav_login\}\n\s*<\/button>\n?/g, '');

// Remove Mobile menu nav_dash
code = code.replace(/<button onClick=\{\(\) => \{ setActiveView\('dashboard'\); setMenuOpen\(false\); \}\} className="p-4 font-bold text-start text-emerald-600 hover:bg-emerald-50 rounded-xl">\{t\.nav_dash\}<\/button>\n?/g, '');

// Remove DashboardView conditional render in App component
code = code.replace(/\{activeView === 'dashboard' && <DashboardView key="dashboard" setView=\{setActiveView\} t=\{t\} isRtl=\{isRtl\} \/>\}\n?/g, '');

// Change CTA setView('dashboard') to setView('pricing') in LandingView
code = code.replace(/<button onClick=\{\(\) => setView\('dashboard'\)} className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-full font-bold text-lg shadow-sm transition-all flex items-center justify-center gap-2">/g, 
'<button onClick={() => setView(\'pricing\')} className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-full font-bold text-lg shadow-sm transition-all flex items-center justify-center gap-2">');

// Change CTA setView('dashboard') to setView('pricing') in PricingView
code = code.replace(/<button onClick=\{\(\) => setView\('dashboard'\)} className="w-full py-3\.5 rounded-xl font-bold transition-all flex justify-center items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600\/25">/g, 
'<button onClick={() => setView(\'landing\')} className="w-full py-3.5 rounded-xl font-bold transition-all flex justify-center items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/25">');

fs.writeFileSync('src/App.tsx', code, 'utf-8');
console.log('Done!');
