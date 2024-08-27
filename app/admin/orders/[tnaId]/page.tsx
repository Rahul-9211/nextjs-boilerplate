// pages/admin/orders/[orderId].tsx

"use client"
import BanterLoader from '@/components/Loader/BanterLoader';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const OrderDetailPage = () => {
  const router = useRouter();
  const tnaId = window.location.href.split("/orders/")[1];

  useEffect(() => {
    // Fetch order details based on orderId
    if (tnaId) {
      // Example fetch request
      fetch(`/api/orders/${tnaId}`)
        .then((response) => response.json())
        .then((data) => {
          // console.log('Order details:', data);
          // Set state or update UI with fetched data
        })
        .catch((error) => {
          console.error('Error fetching order details:', error);
        });
    }
  }, [tnaId]);
  if (!tnaId) {
    return <BanterLoader/>;
  }

  return (
    <div>
      <h1>Order Detail Page</h1>
      <p>TNA ID: {tnaId} </p>
      {/* Render order details here */}
    </div>
  );
};

export default OrderDetailPage;
