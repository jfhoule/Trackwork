export interface ClientData {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  project: string;
  projectName: string;
  clientNumber: string;
}

export const clients: ClientData[] = [
  {
    id: '1',
    name: 'Acme Corp',
    contact: 'John Doe',
    email: 'john@example.com',
    phone: '(123) 456-7890',
    project: 'project-alpha',
    projectName: 'Project Alpha',
    clientNumber: '001',
  },
  {
    id: '2',
    name: 'Globex Inc',
    contact: 'Jane Smith',
    email: 'jane@example.com',
    phone: '(987) 654-3210',
    project: 'project-beta',
    projectName: 'Project Beta',
    clientNumber: '002',
  },
];
