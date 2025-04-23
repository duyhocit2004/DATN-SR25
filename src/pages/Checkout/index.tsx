              <div style={{ marginTop: 16 }}>
                <Form.Item
                  label="Phương thức thanh toán online"
                  name="onlinePaymentMethod"
                  rules={[{ required: true, message: "Vui lòng chọn phương thức thanh toán online!" }]}
                >
                  <div className="flex gap-4">
                    <button
                      type="button"
                      className={`payment-button ${form.getFieldValue('onlinePaymentMethod') === 'VNPAY' ? 'selected' : ''}`}
                      onClick={() => {
                        form.setFieldsValue({ onlinePaymentMethod: 'VNPAY' });
                        handleOnlinePaymentMethodChange({ target: { value: 'VNPAY' } });
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <img src="/images/vnpay-logo.png" alt="VNPay" className="w-10 h-10" />
                        <span className="text-lg font-semibold">VNPay</span>
                      </div>
                    </button>
                    <button
                      type="button"
                      className={`payment-button ${form.getFieldValue('onlinePaymentMethod') === 'MOMO' ? 'selected' : ''}`}
                      onClick={() => {
                        form.setFieldsValue({ onlinePaymentMethod: 'MOMO' });
                        handleOnlinePaymentMethodChange({ target: { value: 'MOMO' } });
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <img src="/images/momo-logo.png" alt="Momo" className="w-10 h-10" />
                        <span className="text-lg font-semibold">Momo</span>
                      </div>
                    </button>
                  </div>
                </Form.Item>
              </div>

              <style jsx>{`
                .payment-button {
                  flex: 1;
                  padding: 16px;
                  border: 2px solid #e5e7eb;
                  border-radius: 8px;
                  background-color: white;
                  cursor: pointer;
                  transition: all 0.3s ease;
                }
                
                .payment-button:hover {
                  border-color: #3b82f6;
                  background-color: #f0f7ff;
                }
                
                .payment-button.selected {
                  border: 2px solid #3b82f6;
                  background-color: #eff6ff;
                }
              `}</style> 