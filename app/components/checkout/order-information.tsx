import CardWithHeader from "../ui/card-with-header";

const OrderInformation = () => {
  return (
    <CardWithHeader title="Order Information">
      <div className="p-5 space-y-4">
        <div className="input-group">
          <label htmlFor="full_name" className="block text-sm font-medium mb-1">Full Name</label>
          <input 
            type="text" 
            placeholder="Type your full name" 
            id="full_name" 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          />
        </div>
        <div className="input-group">
          <label htmlFor="wa_number" className="block text-sm font-medium mb-1">Whatsapp Number</label>
          <input
            type="tel"
            placeholder="+62xxxx"
            id="wa_number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
          />
        </div>
        <div className="input-group">
          <label htmlFor="shipping_address" className="block text-sm font-medium mb-1">Shipping Address</label>
          <textarea
            placeholder="Example Street, 18, West Jakarta, Indonesia, 66521"
            id="shipping_address"
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary resize-none"
          />
        </div>
      </div>
    </CardWithHeader>
  );
};

export default OrderInformation;