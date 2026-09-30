import EmployeeLayoutClient from '@/components/EmployeeLayoutClient';

export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
  return <EmployeeLayoutClient>{children}</EmployeeLayoutClient>;
}
