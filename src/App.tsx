import { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  Clock,
  Database,
  FileText,
  LayoutDashboard,
  Shield,
  Server,
  Settings,
  Users,
  RefreshCw,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  BarChart3,
  AlertCircle,
} from 'lucide-react';

interface Incident {
  id: number;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'active' | 'resolved' | 'monitoring';
  department: string;
  time: string;
  description: string;
}

interface SystemStatus {
  name: string;
  uptime: number;
  status: 'operational' | 'degraded' | 'down';
  lastChecked: string;
}

interface RecoveryTask {
  id: number;
  task: string;
  assignee: string;
  dueDate: string;
  progress: number;
  priority: 'high' | 'medium' | 'low';
}

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [incidents] = useState<Incident[]>([
    {
      id: 1,
      title: 'Asosiy server xususiyatida pasayish',
      severity: 'critical',
      status: 'active',
      department: 'IT',
      time: '2 daqiqa oldin',
      description: 'Asosiy ma\'lumotlar serverida javob berish vaqti keskin oshdi',
    },
    {
      id: 2,
      title: 'Internet uzilishi',
      severity: 'high',
      status: 'monitoring',
      department: 'Tarmoq',
      time: '15 daqiqa oldin',
      description: 'Ikkinchi kanal orqali ulanish tiklandi, asosiy kanal ta\'mirda',
    },
    {
      id: 3,
      title: 'Elektromanjirish buzilishi',
      severity: 'medium',
      status: 'resolved',
      department: 'Infrastructure',
      time: '1 soat oldin',
      description: 'Generator avtomatik ravishda ishga tushdi, elektr ta\'minoti tiklandi',
    },
    {
      id: 4,
      title: 'Bulutli xizmatda kechikish',
      severity: 'low',
      status: 'monitoring',
      department: 'Cloud',
      time: '3 soat oldin',
      description: 'AWS us-east-1 regionida API javob vaqtlari normal darajada',
    },
  ]);

  const [systems] = useState<SystemStatus[]>([
    { name: 'ERP Tizimi', uptime: 99.98, status: 'operational', lastChecked: '1 daqiqa oldin' },
    { name: 'CRM Tizimi', uptime: 99.85, status: 'operational', lastChecked: '2 daqiqa oldin' },
    { name: 'Ma\'lumotlar Bazasi', uptime: 100, status: 'operational', lastChecked: '1 daqiqa oldin' },
    { name: 'Email Server', uptime: 99.72, status: 'degraded', lastChecked: '1 daqiqa oldin' },
    { name: 'Web Portal', uptime: 99.95, status: 'operational', lastChecked: '2 daqiqa oldin' },
    { name: 'API Gateway', uptime: 99.99, status: 'operational', lastChecked: '1 daqiqa oldin' },
  ]);

  const [recoveryTasks] = useState<RecoveryTask[]>([
    { id: 1, task: 'Server resurslarini optimallashtirish', assignee: 'Abdulloh M.', dueDate: '2024-01-15', progress: 75, priority: 'high' },
    { id: 2, task: 'Yedeklashuv rejimini tekshirish', assignee: 'Gulnora S.', dueDate: '2024-01-16', progress: 50, priority: 'high' },
    { id: 3, task: 'Hodimlarni o\'qitish', assignee: 'Jahongir T.', dueDate: '2024-01-20', progress: 30, priority: 'medium' },
    { id: 4, task: 'Dokumentatsiyani yangilash', assignee: 'Nodira K.', dueDate: '2024-01-18', progress: 90, priority: 'low' },
    { id: 5, task: 'Stress test o\'tkazish', assignee: 'Shavkat R.', dueDate: '2024-01-17', progress: 40, priority: 'medium' },
  ]);

  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-700';
      case 'degraded': return 'bg-yellow-100 text-yellow-700';
      case 'down': return 'bg-red-100 text-red-700';
      case 'active': return 'bg-red-100 text-red-700';
      case 'resolved': return 'bg-green-100 text-green-700';
      case 'monitoring': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const stats = [
    { title: 'Aktiv Hodisalar', value: incidents.filter(i => i.status === 'active').length, icon: AlertTriangle, color: 'bg-red-500', change: '+2' },
    { title: 'Tizimlar Uptime', value: '99.97%', icon: Activity, color: 'bg-green-500', change: '+0.12%' },
    { title: 'Xavfsizlik Darajasi', value: 'A+', icon: Shield, color: 'bg-blue-500', change: 'Yuqori' },
    { title: 'Tiklanish Vaqti', value: '4.5 min', icon: Clock, color: 'bg-purple-500', change: '-1.2 min' },
  ];

  const menuItems = [
    { id: 'dashboard', label: 'Boshqaruv paneli', icon: LayoutDashboard },
    { id: 'incidents', label: 'Hodisalar', icon: AlertCircle },
    { id: 'systems', label: 'Tizimlar', icon: Server },
    { id: 'recovery', label: 'Tiklanish', icon: RefreshCw },
    { id: 'bcp', label: 'BCP Rejalari', icon: FileText },
    { id: 'risks', label: 'Xavflar', icon: BarChart3 },
    { id: 'users', label: 'Foydalanuvchilar', icon: Users },
    { id: 'settings', label: 'Sozlamalar', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-cyan-400" />
            <div>
              <h1 className="font-bold text-lg">BCMS</h1>
              <p className="text-xs text-slate-400">Biznes Uzluksizligi</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === item.id
                      ? 'bg-cyan-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-700">
          <div className="bg-slate-800 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center">
                <span className="font-bold">JA</span>
              </div>
              <div>
                <p className="font-medium text-sm">Jahongir Abdullaev</p>
                <p className="text-xs text-slate-400">BCMS Administrator</p>
              </div>
            </div>
            <button className="w-full text-xs text-slate-400 hover:text-white transition-colors">
              Profilni sozlash
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Boshqaruv paneli</h2>
              <p className="text-sm text-gray-500">Bugungi sana: {new Date().toLocaleDateString('uz-UZ')}</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                <AlertCircle className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="flex items-center gap-2 bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors">
                <Shield className="w-5 h-5" />
                <span>Yangi xavf qo'shish</span>
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-red-500' : 'text-green-500'}`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-sm text-gray-500">{stat.title}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Active Incidents */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Yaqin hodisalar</h3>
                  <button className="text-cyan-600 hover:text-cyan-700 text-sm font-medium flex items-center gap-1">
                    Barchasini ko'rish <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {incidents.map((incident) => (
                    <div
                      key={incident.id}
                      onClick={() => setSelectedIncident(incident)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedIncident?.id === incident.id
                          ? 'border-cyan-500 bg-cyan-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-medium text-gray-900">{incident.title}</h4>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(incident.severity)} border`}>
                              {incident.severity.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mb-2">{incident.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                              <Database className="w-3 h-3" /> {incident.department}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {incident.time}
                            </span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(incident.status)}`}>
                          {incident.status === 'active' ? 'Aktiv' : incident.status === 'resolved' ? 'Yechilgan' : 'Kuzatishda'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Tizim holati</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {systems.map((system, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Server className="w-4 h-4 text-gray-500" />
                          <span className="font-medium text-gray-900 text-sm">{system.name}</span>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(system.status)}`}>
                          {system.status === 'operational' ? 'Ishlayapti' : system.status === 'degraded' ? 'Pasaygan' : 'To\'xtagan'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Uptime: {system.uptime}%</span>
                        <span>{system.lastChecked}</span>
                      </div>
                      <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${system.uptime >= 99.9 ? 'bg-green-500' : system.uptime >= 99 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${Math.min(system.uptime, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recovery Tasks */}
          <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Tiklanish rejalari</h3>
                <button className="text-cyan-600 hover:text-cyan-700 text-sm font-medium flex items-center gap-1">
                  Yangi task <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500 border-b">
                      <th className="pb-4 font-medium">Vazifa</th>
                      <th className="pb-4 font-medium">Mas'ul</th>
                      <th className="pb-4 font-medium">Muddat</th>
                      <th className="pb-4 font-medium">Bajarilish</th>
                      <th className="pb-4 font-medium">Prioritet</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {recoveryTasks.map((task) => (
                      <tr key={task.id} className="hover:bg-gray-50">
                        <td className="py-4">
                          <span className="font-medium text-gray-900">{task.task}</span>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium">
                              {task.assignee.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-sm text-gray-600">{task.assignee}</span>
                          </div>
                        </td>
                        <td className="py-4 text-sm text-gray-600">{task.dueDate}</td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden min-w-[100px]">
                              <div
                                className={`h-full rounded-full ${task.progress >= 75 ? 'bg-green-500' : task.progress >= 50 ? 'bg-yellow-500' : 'bg-cyan-500'}`}
                                style={{ width: `${task.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">{task.progress}%</span>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}></div>
                            <span className="text-sm text-gray-600">
                              {task.priority === 'high' ? 'Yuqori' : task.priority === 'medium' ? 'O\'rta' : 'Past'}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white">
              <Phone className="w-10 h-10 mb-4" />
              <h3 className="text-xl font-bold mb-2">Favqulodda qo'ng'iroq</h3>
              <p className="text-3xl font-bold mb-4">+998 71 200 00 00</p>
              <p className="text-red-100 text-sm">24/7 mavjud</p>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
              <Mail className="w-10 h-10 mb-4" />
              <h3 className="text-xl font-bold mb-2">Email xabarnoma</h3>
              <p className="text-lg font-semibold mb-4">emergency@company.uz</p>
              <p className="text-blue-100 text-sm">Hodisalardan darhol xabardorlik</p>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
              <MapPin className="w-10 h-10 mb-4" />
              <h3 className="text-xl font-bold mb-2">Krizis boshqaruv markazi</h3>
              <p className="text-lg font-semibold mb-4">Bino A, 1-qavat</p>
              <p className="text-green-100 text-sm">Krizis holatlarida yig'ilish joyi</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
